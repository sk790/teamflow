import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/search-not-found.svg", //add more images here later
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      title: args.title,
      authorId: user.subject,
      authorName: user.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const deleteBoard = mutation({
  args: {
    id: v.id("boards"), //inside the boards table name
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
