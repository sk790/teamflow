import { useOthersConnectionIds } from "@liveblocks/react";
import React, { memo } from "react";
import { Cursor } from "./Cursor";

export const CursorsPresence = memo(() => {
  const Cursors = () => {
    const ids = useOthersConnectionIds();
    return (
      <>
        {ids.map((connectionId) => (
          <Cursor key={connectionId} connectionId={connectionId} />
        ))}
      </>
    );
  };

  return <Cursors />;
});

CursorsPresence.displayName = "CursorsPresence";
