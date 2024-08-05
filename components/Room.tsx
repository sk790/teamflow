"use client";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

function Room({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_prod_Dw9CMQRGxYIp6eJgwEYpPV_hmUXnNjiH2m107upGUoaToOp6WzAsfcfZkBM8o4zb"
      }
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading...</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;
