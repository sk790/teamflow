import React from "react";
import { Canvas } from "./_components/canvas";
import Room from "@/components/Room";

function Board({ params }: { params: { boardId: string } }) {
  return (
    <Room roomId={params.boardId}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}

export default Board;
