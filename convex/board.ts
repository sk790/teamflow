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

export const updateBoard = mutation({
  args: {
    id: v.id("boards"), //inside the boards table name
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const tittle = args.title.trim();
    if (!tittle) {
      throw new Error("Title cannot be empty");
    }
    if (tittle.length > 50 || tittle.length < 2) {
      throw new Error(
        "Title cannot be longer than 50 characters or shorter than 2"
      );
    }
    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});
