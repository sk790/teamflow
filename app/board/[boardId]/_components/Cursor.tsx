import { randomColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

export const Cursor = memo(({ connectionId }: { connectionId: number }) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user?.presence.cursor);

  const name = info?.name || "Teammate";
  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject //move this tag according to cordinates
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-sm"
    >
      <MousePointer2
        className="h-4 w-4"
        style={{
          fill: randomColor(connectionId),
          color: randomColor(connectionId),
        }}
      />
      <div
        className="absolute left-4 rounded-md text-xs px-1 "
        style={{ backgroundColor: randomColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
