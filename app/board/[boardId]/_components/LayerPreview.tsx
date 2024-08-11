import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import React, { memo } from "react";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Text } from "./Text";
import { Note } from "./Note";
import { Path } from "./Path";
import { ColorToCss } from "@/lib/utils";

interface Props {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: Props) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return null;
    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            x={layer.x}
            y={layer.y}
            points={layer.points}
            fill={layer.fill?ColorToCss(layer.fill):"#000"}
            onPointerDown={(e)=>onLayerPointerDown(e,id)}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
