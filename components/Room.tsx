"use client";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

function Room({
  children,
  roomId,
  fallback
}: {
  children: React.ReactNode;
  roomId: string;
  fallback:NonNullable<ReactNode>|null
}) {

    
  return (
    <LiveblocksProvider 
      authEndpoint={"/api/liveblocks-auth"}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>  {/* this is a loading effect while canvas connecting to client room */}
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;

// publicKey = pk_dev_babH0eMIehbPm9hqCeKE2KmuQWenYv2Okr9jnicqQoAvtWt0joWk7-w_3eMFlAlY
