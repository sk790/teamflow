"use client";

import { useCanRedo, useCanUndo, useHistory, useSelf } from "@liveblocks/react/suspense";
import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import { useState } from "react";
import { canvasMode, canvasState } from "@/types/canvas";

export const Canvas = ({ boardId }: { boardId: string }) => {

    const [canvasState, setCanvasState] =useState<canvasState>({
        mode:canvasMode.None
    })

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();
  

  return (
    <main className="w-full h-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
        />
    </main>
  );
};
