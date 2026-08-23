import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  products: {
    categories: r.many.categories({
      from: r.products.id.through(r.productCategories.productId),
      to: r.categories.id.through(r.productCategories.categoryId),
    }),

    basketEntries: r.many.basketEntries(),
  },

  categories: {
    products: r.many.products({
      from: r.categories.id.through(r.productCategories.categoryId),
      to: r.products.id.through(r.productCategories.productId),
    }),
  },

  productCategories: {
    product: r.one.products({
      from: r.productCategories.productId,
      to: r.products.id,
    }),
    category: r.one.categories({
      from: r.productCategories.categoryId,
      to: r.categories.id,
    }),
  },

  baskets: {
    entries: r.many.basketEntries(),
  },

  basketEntries: {
    basket: r.one.baskets({
      from: r.basketEntries.basketId,
      to: r.baskets.id,
    }),

    product: r.one.products({
      from: r.basketEntries.productId,
      to: r.products.id,
    }),
  },
}));
