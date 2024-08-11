"use client";

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { CursorsPresence } from "./CursorsPresence";
import {
  ColorToCss,
  findInterectingLayerWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  randomColor,
  resizeBounds,
} from "@/lib/utils";
import { useOthersMapped, useSelf, useStorage } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./LayerPreview";
import { SelectionBox } from "./SelectionBox";
import { SelectionToolbar } from "./SelectionToolbar";
import { Path } from "./Path";
import { useDisableScrollBounce } from "@/hooks/UseDesableScrollBounce";
import { DeleteLayer } from "@/hooks/useDeleteLayer";

export const Canvas = ({ boardId }: { boardId: string }) => {
  const layerIds = useStorage((root) => root.layerIds);
  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const MAX_LAYERS = 100;
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  useDisableScrollBounce();
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const livelLayers = storage.get("layers");
      if (livelLayers.size >= MAX_LAYERS) {
        return;
      }
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      livelLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      const layerIds = storage.get("layerIds").toImmutable();
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

      const ids = findInterectingLayerWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );
      setMyPresence({ selection: ids }, { addToHistory: true });
    },
    [layerIds]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      // console.log("startMultiSelection");

      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);

  const translatSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }
      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };
      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }
      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState]
  );

  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const pencilDraft = self.presence.pencilDraft;

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }
      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);
      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor]
  );

  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const pencilDraft = self.presence.pencilDraft;
      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }
      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }
      const bounds = resizeBounds(
        canvasState.initiaBounds,
        canvasState.corner,
        point
      );
      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);
      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onResizeHandlerPointerDown = useCallback(
    (
      //to select the layer that is being resized
      corner: Side,
      initialBounds: XYWH
    ) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initiaBounds: initialBounds,
        corner,
      });
    },
    [history]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.None) {
        // console.log(camera);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
        // console.log({ current, canvasState });
      } else if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        // console.log("translating");
        translatSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        // console.log("resizing");
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        // console.log("pencil");

        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      canvasState,
      resizeSelectedLayer,
      camera,
      translatSelectedLayer,
      continueDrawing,
      startMultiSelection,
      updateSelectionNet,
    ]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useCallback(
    //it is help of we unselect layere
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }
      //add case for drawing
      if (canvasState.mode === CanvasMode.Pencil) {
        console.log("pencil");
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onPointerUp = useMutation(
    //fired when i release the mouse click

    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      // console.log("onPointerUp", point);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        // console.log("unselect");
        unselectLayer();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      history.resume();
    },
    [
      camera,
      canvasState,
      history,
      insertLayer,
      unselectLayer,
      setCanvasState,
      insertPath,
    ]
  );

  const selections = useOthersMapped((user) => user.presence?.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = randomColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Inserting ||
        canvasState.mode === CanvasMode.Pencil
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, history, camera, canvasState.mode]
  );
  const deleteLayer = DeleteLayer();
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayer, history]);

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        CanvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <SelectionToolbar camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className="w-[100vw] h-[100vh]"
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translateX(${camera.x}px) translateY(${camera.y}px)`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlerPointerDown={onResizeHandlerPointerDown}
          />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-transparent stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {/* for live drawing */}
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={ColorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};
