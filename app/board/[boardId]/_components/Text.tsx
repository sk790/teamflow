import { cn, ColorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface Props {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
const font = Kalam({ subsets: ["latin"], weight: "400" });

export const Text = ({ id, layer, onPointerDown, selectionColor }: Props) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentEditableChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };


  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
  };
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? "1px solid " + selectionColor : "none",
      }}
    >
      <ContentEditable
        html={value||""}
        onChange={handleContentEditableChange}
        className={cn(
          "h-full w-full p-3 drop-shadow-2xl outline-none flex justify-center items-center text-center",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? ColorToCss(fill) : "#000",
        }}
      />
      {value}
    </foreignObject>
  );
};
