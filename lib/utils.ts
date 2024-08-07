import { Camera } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#DC2626",
  "#2563EB",
  "#7C3AED",
  "#10B981",
  "#F59E0B",
  "#14B8A6",
  "#8B5CF6",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomColor(connectionId:number):string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(e:React.PointerEvent,camera:Camera){
  return{
    x:Math.round(e.clientX)-camera.x,
    y:Math.round(e.clientY)-camera.y
  }
}