import { cookies } from "next/headers";
import { db } from "@/db";
import { basketEntries, baskets } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const basketCookie = "basket_id";

async function getBasket() {
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

function responseBody(productId: number, count: number, stock: number) {
  return { productId, count, stock };
}

async function getProductId(params: Promise<{ productId: string }>) {
  const { productId: rawProductId } = await params;
  const productId = Number(rawProductId);
  return Number.isInteger(productId) && productId > 0 ? productId : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const productId = await getProductId(params);
  if (productId === null) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const product = await db.query.products.findFirst({
    where: { id: productId },
  });
  if (!product)
    return Response.json({ error: "Product not found" }, { status: 404 });

  const basket = await getBasket();
  const entry = await db.query.basketEntries.findFirst({
    where: { basketId: basket.id, productId },
  });
  const response = Response.json(
    responseBody(productId, entry?.count ?? 0, product.stock),
  );
  if (basket.created) {
    response.headers.append(
      "Set-Cookie",
      `${basketCookie}=${basket.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
    );
  }
  return response;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const productId = await getProductId(params);
  if (productId === null) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as {
    count?: unknown;
  } | null;
  const count = body?.count;
  if (!Number.isInteger(count) || Number(count) < 1) {
    return Response.json(
      { error: "Count must be a positive integer" },
      { status: 400 },
    );
  }

  const product = await db.query.products.findFirst({
    where: { id: productId },
  });
  if (!product)
    return Response.json({ error: "Product not found" }, { status: 404 });
  if (Number(count) > product.stock) {
    return Response.json(
      {
        error: "Requested count exceeds stock",
        data: { productId, count, product },
      },
      { status: 409 },
    );
  }

  const basket = await getBasket();
  await db
    .insert(basketEntries)
    .values({ basketId: basket.id, productId, count: Number(count) })
    .onConflictDoUpdate({
      target: [basketEntries.basketId, basketEntries.productId],
      set: { count: Number(count) },
    });

  const response = Response.json(
    responseBody(productId, Number(count), product.stock),
  );
  response.headers.append(
    "Set-Cookie",
    `${basketCookie}=${basket.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
  );
  return response;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const productId = await getProductId(params);
  if (productId === null) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const product = await db.query.products.findFirst({
    where: { id: productId },
  });
  if (!product)
    return Response.json({ error: "Product not found" }, { status: 404 });

  const basket = await getBasket();
  await db
    .delete(basketEntries)
    .where(
      and(
        eq(basketEntries.basketId, basket.id),
        eq(basketEntries.productId, productId),
      ),
    );

  const response = Response.json({
    message: `Basket entry for product ${productId} has been removed`,
  });
  response.headers.append(
    "Set-Cookie",
    `${basketCookie}=${basket.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
  );
  return response;
}
