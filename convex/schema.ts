// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authId: v.string(), // Clerk userId
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),

    role: v.string(), // e.g. "admin", "customer"
  })
    .index("by_authId", ["authId"])
    .index("by_email", ["email"]),

  categories: defineTable({
    name: v.string(), // e.g. "T-Shirts"
    slug: v.string(), // e.g. "t-shirts"
  }).index("by_slug", ["slug"]),

  collections: defineTable({
    name: v.string(), // e.g. "Summer 2025"
    slug: v.string(), // e.g. "summer-2025"
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    sizes: v.array(v.string()),
    colors: v.array(
      v.object({
        name: v.string(),
        hex: v.string(),
      })
    ),
    images: v.array(
      v.object({
        url: v.string(),
        alt: v.optional(v.string()),
        position: v.optional(v.number()),
      })
    ),
    isActive: v.boolean(),
    isFastSelling: v.boolean(),
    isOnSale: v.boolean(),
    isNewArrival: v.boolean(),
    isLimitedEdition: v.boolean(),
    showPrice: v.number(),
    realPrice: v.number(),
    categoryId: v.id("categories"), // link to 1 category
    collectionIds: v.array(v.id("collections")), // can belong to many collections
  })
    .index("by_category", ["categoryId"])
    .index("by_active", ["isActive"])
    .index("by_sale", ["isOnSale"])
    .index("by_fast_selling", ["isFastSelling"]),

  carts: defineTable({
    userId: v.id("users"), // one cart belongs to one user
    createdAt: v.number(), // Date.now()
    updatedAt: v.number(), // Date.now()
  }).index("by_user", ["userId"]),

  cart_items: defineTable({
    cartId: v.id("carts"),
    productId: v.id("products"),

    size: v.optional(v.string()), // selected size
    color: v.optional(v.string()), // selected color (hex or name)

    quantity: v.number(), // number of units
  })
    .index("by_cart", ["cartId"])
    .index("by_product", ["productId"]),

  newsletters: defineTable({
    email: v.string(),
    createdAt: v.number(), // timestamp
  }).index("by_email", ["email"]),
});
