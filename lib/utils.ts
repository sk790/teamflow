import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
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

export function randomColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function ColorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }
  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }
  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

export function findInterectingLayerWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const react = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
  const Ids = [];
  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }
    const { x, y, width, height } = layer;
    if (
      x < react.x + react.width &&
      x + width > react.x &&
      y < react.y + react.height &&
      y + height > react.y
    ) {
      Ids.push(layerId);
    }
  }
  return Ids;
}

export function getContrastingColor(color: Color) {
  const yiq = (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

export function penPointsToPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("penPointsToPathLayer requires at least 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (x < left) {
      left = x;
    }
    if (x > right) {
      right = x;
    }
    if (y < top) {
      top = y;
    }
    if (y > bottom) {
      bottom = y;
    }
  }
  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

export const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) {
    return "";
  }
  const d = stroke.reduce(
    (acc, [x0, y0],i,arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
};
