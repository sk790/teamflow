"use client";
import { ColorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface Props {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-1 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton color={{ r: 243, g: 25, b: 125 }} onClick={onChange} />
      <ColorButton color={{ r: 152, g: 45, b: 256 }} onClick={onChange} />
      <ColorButton color={{ r: 12, g: 125, b: 85 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 124, b: 56 }} onClick={onChange} />
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
      className="w-5 h-5 flex items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="w-5 h-5 border border-neutral-300"
        style={{
          backgroundColor: ColorToCss(color),
        }}
      />
    </button>
  );
};
