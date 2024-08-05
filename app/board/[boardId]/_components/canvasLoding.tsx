import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { InfoSkeleton } from "./Info";
import { ToolbarSkeleton } from "./Toolbar";
import { ParticipantsSkeleton } from "./Participants";

function CanvasLoding() {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <ImSpinner2 className="animate-spin w-6 h-6" />
      <InfoSkeleton />
      <ToolbarSkeleton />
      <ParticipantsSkeleton />
    </main>
  );
}

export default CanvasLoding;
