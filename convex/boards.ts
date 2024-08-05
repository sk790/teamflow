import { v } from "convex/values";
import { query } from "./_generated/server";

export const getBoards = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardFavoriteWithRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", user.subject).eq("boardId", board._id)
        ).unique().then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite,
          }
        })
    });
    const boardsWithFavoriteBoolean = await Promise.all(boardFavoriteWithRelation);
    return boardsWithFavoriteBoolean;
  },
});
