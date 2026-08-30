import { basketEntries, products } from "@/db/schema";
import { Product } from "./productTypes";

export type BasketEntry = typeof basketEntries.$inferSelect;
export type BasketEntryWithProduct = BasketEntry & {
  product: Product;
};
