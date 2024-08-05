import React from "react";
import { Canvas } from "./_components/canvas";
import Room from "@/components/Room";
import CanvasLoding from "./_components/canvasLoding";

function Board({ params }: { params: { boardId: string } }) {
  return<CanvasLoding/>
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoding/>}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}

export default Board;
