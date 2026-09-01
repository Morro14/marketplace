import { basketEntries, products } from "@/db/schema";
import { Product } from "./productTypes";

export type BasketEntry = typeof basketEntries.$inferSelect;

export interface BasketEntryWithProduct {
  productId: number;
  count: number;
  product: Product;
}
