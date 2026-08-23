import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  products: {
    categories: r.many.categories({
      from: r.products.id,
      to: r.categories.id,
    }),

    basketEntries: r.many.basketEntries(),
  },

  categories: {
    products: r.many.products(),
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
