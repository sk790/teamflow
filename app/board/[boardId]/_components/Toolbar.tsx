import React from "react";
import ToolButton from "./ToolButton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { canvasMode, canvasState } from "@/types/canvas";

interface ToolBarProps {
  canvasState: canvasState;
  setCanvasState: (newState: canvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolBarProps) {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md shadow-md flex items-center flex-col gap-y-1">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: canvasMode.None })}
          isActive={canvasState.mode === canvasMode.None}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({ mode: canvasMode.Inserting })}
          isActive={canvasState.mode === canvasMode.Inserting}
        />
        <ToolButton label="Sticky note" icon={StickyNote} onClick={() => {}} />
        <ToolButton label="Rectangle" icon={Square} onClick={() => {}} />
        <ToolButton label="Ellipse" icon={Circle} onClick={() => {}} />
        <ToolButton label="Pen" icon={Pencil} onClick={() => {}} />
      </div>
      <div className="bg-white rounded-md shadow-md flex items-center flex-col p-1 gap-y-2">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 bg-white h-[360px] w-[52px] shadow-md rounded-md">
      {/* <Skeleton className='h-full w-full bg-muted-400'/> */}
    </div>
  );
};

export default Toolbar;
