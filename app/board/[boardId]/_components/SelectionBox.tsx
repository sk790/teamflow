"use client";

import { UseSelectionBounds } from "@/hooks/useSelectionBound";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";
import React, { memo } from "react";

interface Props {
  onResizeHandlerPointerDown: (corner: Side, initialBounds: XYWH) => void;
}

export const SelectionBox = memo(({ onResizeHandlerPointerDown }: Props) => {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const HANDLE_WIDTH = 8;
  const HANDLE_HEIGHT = 8;

  const isShowingHandles = useStorage(
    (root) =>
      soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
  );

  const bounds = UseSelectionBounds();

  if (!bounds) {
    return null;
  }

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH/2}px, ${bounds.y - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Left+Side.Top, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x+bounds.width/2 - HANDLE_WIDTH/2}px, ${bounds.y - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Top, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x+bounds.width - HANDLE_WIDTH/2}px, ${bounds.y - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Right+Side.Top, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x+bounds.width - HANDLE_WIDTH/2}px, ${bounds.y+bounds.height/2 - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Right, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x+bounds.width - HANDLE_WIDTH/2}px, ${bounds.y+bounds.height - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Right+Side.Bottom, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x+bounds.width/2 - HANDLE_WIDTH/2}px, ${bounds.y+bounds.height - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Bottom, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH/2}px, ${bounds.y+bounds.height - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Left+Side.Bottom, bounds);
            }}
          />
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_HEIGHT}px`,
              transform: `translate(${bounds.x - HANDLE_WIDTH/2}px, ${bounds.y+bounds.height/2 - HANDLE_HEIGHT/2}px)`,
            }}
            onPointerDown={(e)=>{
              e.stopPropagation();
              onResizeHandlerPointerDown(Side.Left, bounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";
