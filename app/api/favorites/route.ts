import { cookies } from "next/headers";
import { db } from "@/db";
import { baskets, favorites } from "@/db/schema";
import { getFavoriteIds, addToFavorites, removeFromFavorites } from "@/src/data/favoritesQueries";
import { eq } from "drizzle-orm";

const basketCookie = "basket_id";

async function getOrCreateBasket() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  if (Number.isInteger(basketId) && basketId > 0) {
    const existing = await db.query.baskets.findFirst({
      where: { id: basketId },
    });
    if (existing) return { id: existing.id, created: false };
  }

  const [basket] = await db
    .insert(baskets)
    .values({})
    .returning({ id: baskets.id });
  return { id: basket.id, created: true };
}

export async function GET() {
  const favoriteIds = await getFavoriteIds();
  return Response.json({ favorites: favoriteIds });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productId?: unknown;
  } | null;

  const productId = body?.productId;
  if (!Number.isInteger(productId) || Number(productId) < 1) {
    return Response.json(
      { error: "Invalid product id" },
      { status: 400 },
    );
  }

  const product = await db.query.products.findFirst({
    where: { id: Number(productId) },
  });
  if (!product) {
    return Response.json(
      { error: "Product not found" },
      { status: 404 },
    );
  }

  const basket = await getOrCreateBasket();
  const success = await addToFavorites(Number(productId));

  const response = Response.json({
    success,
    productId: Number(productId),
  });

  if (basket.created) {
    response.headers.append(
      "Set-Cookie",
      `${basketCookie}=${basket.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    );
  }

  return response;
}

export async function DELETE(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    productId?: unknown;
  } | null;

  const productId = body?.productId;
  if (!Number.isInteger(productId) || Number(productId) < 1) {
    return Response.json(
      { error: "Invalid product id" },
      { status: 400 },
    );
  }

  const success = await removeFromFavorites(Number(productId));
  return Response.json({
    success,
    productId: Number(productId),
  });
}
