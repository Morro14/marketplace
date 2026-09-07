import { cookies } from "next/headers";
import { db } from "@/db";
import { calcCost } from "@/src/utils/basketUtils";
import type {
  BasketCheckoutSummary,
  BasketEntry,
  BasketEntryWithProduct,
} from "./basketTypes";

const basketCookie = "basket_id";

export async function getBasket(): Promise<BasketEntry[]> {
  const cookieValue = (await cookies()).get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  if (!Number.isInteger(basketId) || basketId < 1) return [];

  const result = await db.query.basketEntries.findMany({
    where: { basketId },
  });
  return result;
}

export async function getBasketWithProducts() {
  const cookieValue = (await cookies()).get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  if (!Number.isInteger(basketId) || basketId < 1) return [];

  const result = await db.query.basketEntries.findMany({
    where: { basketId },
    with: { product: { with: { categories: true } } },
  });
  return result as BasketEntryWithProduct[];
}

function calculateCostTotal(basketEntries: BasketEntryWithProduct[]): number {
  return basketEntries.reduce(
    (total, entry) => total + calcCost(entry.product.price, entry.count),
    0,
  );
}

export async function getBasketCheckoutSummary(): Promise<BasketCheckoutSummary> {
  const basketEntries = await getBasketWithProducts();

  return {
    basketEntries,
    costTotal: calculateCostTotal(basketEntries),
    currency: process.env.CURRENCY ?? "USD",
  };
}
