import { ColorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface Props {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
  }

export const Ellipse = ({id,layer,onPointerDown,selectionColor}:Props)=>{
return(
    <ellipse
    className="drop-shadow-md"
    onPointerDown={(e) => onPointerDown(e, id)}
    style={{
      transform: `translate(${layer.x}px, ${layer.y}px)`,
    }}
    x={0}
    y={0}
    cx={layer.width/2}
    cy={layer.height/2}
    rx={layer.width/2}
    ry={layer.height/2}
    strokeWidth={1}
    fill={layer.fill?ColorToCss(layer.fill):"#000"}
    stroke={selectionColor||"transparent"}
    
    />
)
}