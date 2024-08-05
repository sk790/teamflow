import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Info({ boardId }: { boardId: string }) {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md shadow-md h-12 p-1.5 flex items-center">
      Information about the board {boardId}
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md shadow-md h-12 p-1.5 flex items-center w-[300px]">
      {/* <Skeleton className="w-full h-full bg-muted-400"/> */}
    </div>
  );
};

export default Info;
