import { cookies } from "next/headers";
import { db } from "@/db";
import { favorites } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { BasketEntryWithProduct } from "./basketTypes";

const basketCookie = "basket_id";

async function getBasketId(): Promise<number | null> {
  const cookieValue = (await cookies()).get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  if (!Number.isInteger(basketId) || basketId < 1) return null;
  return basketId;
}

export async function getFavoriteIds(): Promise<number[]> {
  const basketId = await getBasketId();
  if (!basketId) return [];

  const result = await db.query.favorites.findMany({
    where: { basketId },
  });

  return result.map((fav) => fav.productId);
}

export async function getFavoritesWithProducts(): Promise<BasketEntryWithProduct[]> {
  const basketId = await getBasketId();
  if (!basketId) return [];

  const result = await db.query.favorites.findMany({
    where: { basketId },
    with: { product: { with: { categories: true } } },
  });

  return result.map((fav) => ({
    productId: fav.productId,
    count: 1, // Favorites don't have a count
    product: fav.product,
  })) as BasketEntryWithProduct[];
}

export async function addToFavorites(productId: number): Promise<boolean> {
  const basketId = await getBasketId();
  if (!basketId) return false;

  try {
    await db.insert(favorites).values({
      basketId,
      productId,
    });
    return true;
  } catch {
    // Entry might already exist (duplicate key error)
    return false;
  }
}

export async function removeFromFavorites(productId: number): Promise<boolean> {
  const basketId = await getBasketId();
  if (!basketId) return false;

  try {
    const result = await db
      .delete(favorites)
      .where(and(eq(favorites.basketId, basketId), eq(favorites.productId, productId)));
    return result.changes > 0;
  } catch {
    return false;
  }
}

export async function isFavorited(productId: number): Promise<boolean> {
  const basketId = await getBasketId();
  if (!basketId) return false;

  const result = await db.query.favorites.findFirst({
    where: { basketId, productId },
  });

  return !!result;
}
