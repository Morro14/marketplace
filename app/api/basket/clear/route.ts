import { cookies } from "next/headers";
import { db } from "@/db";
import { basketEntries, baskets } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const basketCookie = "basket_id";

async function getBasket(): Promise<{ id: number; created: boolean }> {
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

export async function DELETE(request: Request) {
  const basket = await getBasket();
  const result = await db
    .delete(basketEntries)
    .where(eq(basketEntries.basketId, basket.id))
    .returning({
      basketId: basketEntries.basketId,
    });
  console.log("result", result);
  return Response.json({
    message: `Basket ID${basket.id} has been cleared`,
    basketId: basket.id,
  });
}
