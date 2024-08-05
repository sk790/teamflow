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
      publicApiKey={
        "pk_prod_Dw9CMQRGxYIp6eJgwEYpPV_hmUXnNjiH2m107upGUoaToOp6WzAsfcfZkBM8o4zb"
      }
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;
