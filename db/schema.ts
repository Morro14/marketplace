import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique().default(""),
  description: text("description").notNull(),
  price: real("price").notNull(),
  quantity: real("quantity").notNull(),
  stock: real("stock").notNull(),
  priceUnit: text("price_unit", {
    enum: ["unit", "kg", "g", "l", "ml", "bunch", "dozen"],
  }).notNull(),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique().default(""),
  name: text("name").notNull().unique(),
});

export const productCategories = sqliteTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.categoryId] }),
  ],
);

export const baskets = sqliteTable("baskets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
});

export const basketEntries = sqliteTable("basket_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  basketId: integer("basket_id")
    .notNull()
    .references(() => baskets.id, {
      onDelete: "cascade",
    }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  count: integer("count").notNull(),
});
