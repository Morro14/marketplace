import { basketEntries } from "@/db/schema";
import { Product } from "./productTypes";

export type BasketEntry = typeof basketEntries.$inferSelect;

export interface BasketEntryWithProduct {
  productId: number;
  count: number;
  product: Product;
}

export interface BasketCheckoutSummary {
  basketEntries: BasketEntryWithProduct[];
  costTotal: number;
  currency: string;
}
