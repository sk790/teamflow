"use client";

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@liveblocks/react/suspense";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useCallback, useState } from "react";
import { Camera, canvasMode, canvasState } from "@/types/canvas";
import { CursorsPresence } from "./CursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

export const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<canvasState>({
    mode: canvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const onWheel = useCallback((e: React.WheelEvent) => {
    console.log("onWheel");
    if (e.deltaY > 0) {
      setCamera((camera) => ({ x: camera.x - 10, y: camera.y - 10 }));
    } else {
      setCamera((camera) => ({ x: camera.x + 10, y: camera.y + 10 }));
    }
  }, []);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className="w-[100vw] h-[100vh]"
        onPointerMove={onPointerMove}
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
