import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const liveBlocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log("authorization", {
    authorization,
    user,
  });

  if (!user || !authorization) {
    return new Response("User not logged in", { status: 403 });
  }

  const { room } = await request.json();
  console.log("room", room);

  const board = await convex.query(api.board.getBoard, { id: room });

  if (board?.orgId !== authorization?.orgId) {
    return new Response("user not Unauthorized for this room", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Teammeat",
    picture: user.imageUrl,
  };
  const session = liveBlocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();
  
  return new Response(body, { status });
}
