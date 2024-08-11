"use client";
import { ColorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface Props {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-1 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton color={{ r: 0, g: 191, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 255, b: 127 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 20, b: 147 }} onClick={onChange} />
      <ColorButton color={{ r: 205, g: 133, b: 63 }} onClick={onChange} />
      <ColorButton color={{ r: 112, g: 128, b: 144 }} onClick={onChange} />
      <ColorButton color={{ r: 105, g: 105, b: 105 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 69, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 0, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 240, g: 128, b: 128 }} onClick={onChange} />
      <ColorButton color={{ r: 192, g: 192, b: 192 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
    </div>
  );
};

interface ColorButtonProps {
  color: Color;
  onClick: (color: Color) => void;
}
const ColorButton = ({ color, onClick }: ColorButtonProps) => {
  return (
    <button
      className="w-6 h-6 flex items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="w-6 h-6 border rounded-sm border-neutral-300"
        style={{
          backgroundColor: ColorToCss(color),
        }}
      />
    </button>
  );
};
