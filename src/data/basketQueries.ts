import { cookies } from "next/headers";
import { db } from "@/db";
import type { BasketEntry, BasketEntryWithProduct } from "./basketTypes";

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

export async function getBasketWithProducts(): Promise<BasketEntryWithProduct[]> {
  const cookieValue = (await cookies()).get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  if (!Number.isInteger(basketId) || basketId < 1) return [];

  const result = await db.query.basketEntries.findMany({
    where: { basketId },
    with: { product: true },
  });
  return result as BasketEntryWithProduct[];
}
