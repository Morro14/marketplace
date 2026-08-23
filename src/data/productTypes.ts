import { categories, products } from "@/db/schema";

export type Product = typeof products.$inferSelect & {
  categories: (typeof categories.$inferSelect)[];
};

export type Category = typeof categories.$inferSelect;