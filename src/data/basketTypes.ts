import { basketEntries } from "@/db/schema";
import { Product } from "./productTypes";
import { Currency } from "../utils/appVars";

export type BasketEntry = typeof basketEntries.$inferSelect;

export interface BasketEntryWithProduct {
  productId: number;
  count: number;
  product?: Product;
}

export interface BasketCheckoutSummary {
  basketEntries: BasketEntryWithProduct[];
  costTotal: number;
  currency: string;
}

export interface BasketOptions {
  currency: Currency;
}
