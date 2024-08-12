import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/search-not-found.svg",//add more images here later
  "/bord-1.svg",
  "/board-2.svg",
  "/board-3.jpg"
  
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
    
    const existingFavorite = await ctx.db
    .query("userFavorites")
    .withIndex("by_user_board", (q) =>
        q.eq("userId", user.subject).eq("boardId", args.id)
      )
      .unique();
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }
    // const max = await ctx.db.query("boards").collect;
    // console.log("max", max);

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
    // console.log(args.title, user);

    const title = args.title.trim();
    if (!title) {
      throw new Error("Title cannot be empty");
    }
    if (title.length > 50 || title.length < 2) {
      throw new Error(
        "Title cannot be longer than 50 characters or shorter than 2"
      );
    }
    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const addFavorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }
    const userId = user.subject;
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Already favorited");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });
    return board;
  },
});
export const removeFavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }
    const userId = user.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Not found in favorites");
    }

    await ctx.db.delete(existingFavorite._id);
    return board;
  },
});


export const getBoard = query({
  args:{id:v.id("boards")},
  handler:async(ctx,agrs) =>{
    const board = ctx.db.get(agrs.id);
    return board;
  }
})