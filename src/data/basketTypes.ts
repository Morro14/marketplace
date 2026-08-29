import { basketEntries, products } from "@/db/schema";

export type BasketEntry = typeof basketEntries.$inferSelect;
export type BasketEntryWithProduct = BasketEntry & {
  product: typeof products.$inferSelect;
};
