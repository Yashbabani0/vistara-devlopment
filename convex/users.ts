// convex/users.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrUpdateUser = mutation({
  args: {
    authId: v.string(),      // Clerk userId
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_authId", (q) => q.eq("authId", args.authId))
      .unique();

    if (existingUser) {
      // Update user details
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        image: args.image,
      });
      return existingUser._id;
    } else {
      // Create new user
      const newUserId = await ctx.db.insert("users", {
        authId: args.authId,
        email: args.email,
        name: args.name,
        image: args.image,
        role: "customer", // default role
      });
      return newUserId;
    }
  },
});
