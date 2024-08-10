import { UseSelectionBounds } from "@/hooks/useSelectionBound";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";
import { ColorPicker } from "./ColorPicker";
import { DeleteLayer } from "@/hooks/useDeleteLayer";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface Props {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionToolbar = memo(({ camera, setLastUsedColor }: Props) => {
  const selection = useSelf((me) => me.presence.selection);

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toArray();
      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );
  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toArray();
      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - i);
      }
    },
    [selection]
  );

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection?.forEach((layerId) => {
        liveLayers.get(layerId)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  const deleteLayer = DeleteLayer();

  const selectionBounds = UseSelectionBounds();
  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;
  return (
    <div
      className="absolute p-1 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
            )`,
      }}
    >
      <ColorPicker onChange={setFill} />
      <div className="flex flex-col">
        <Hint label="Bring to front">
          <Button variant={"ghost"} size={"icon"} onClick={moveToFront}>
            <BringToFront className="w-4 h-4" />
          </Button>
        </Hint>
        <Hint label="Send to back">
          <Button variant={"ghost"} size={"icon"} onClick={moveToBack}>
            <SendToBack className="w-4 h-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button variant={"ghost"} onClick={deleteLayer}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionToolbar.displayName = "SelectionToolbar";
