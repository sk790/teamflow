"use client";
import { Layer } from "@/types/canvas";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

function Room({
  children,
  roomId,
  fallback,
}: {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"} throttle={16}>
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
          selection: [],
          pencilDraft: null,
          penColor: null,
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {" "}
          {/* this is a loading effect while canvas connecting to client room */}
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;

// publicKey = pk_dev_babH0eMIehbPm9hqCeKE2KmuQWenYv2Okr9jnicqQoAvtWt0joWk7-w_3eMFlAlY
