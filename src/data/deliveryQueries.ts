import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { deliveryAddresses, deliveryInfo } from "@/db/schema";
import type {
  DeliveryInfoInput,
  DeliveryInfoWithAddress,
} from "./deliveryTypes";

const basketCookie = "basket_id";

async function getBasketIdFromCookie(): Promise<number | null> {
  const cookieValue = (await cookies()).get(basketCookie)?.value;
  const basketId = cookieValue ? Number(cookieValue) : NaN;

  return Number.isInteger(basketId) && basketId > 0 ? basketId : null;
}

export async function getDeliveryInfo(): Promise<DeliveryInfoWithAddress | null> {
  const basketId = await getBasketIdFromCookie();
  if (!basketId) return null;

  const result = await db.query.deliveryInfo.findFirst({
    where: { basketId },
    with: { address: true },
  });

  return result ?? null;
}

export async function saveDeliveryInfo(
  input: DeliveryInfoInput,
): Promise<DeliveryInfoWithAddress> {
  const basketId = await getBasketIdFromCookie();
  if (!basketId) {
    throw new Error("Cannot save delivery info without a basket cookie");
  }

  const existing = await db.query.deliveryInfo.findFirst({
    where: { basketId },
  });

  if (existing) {
    db.update(deliveryInfo)
      .set({
        fullName: input.fullName,
        phone: input.phone ?? null,
        email: input.email,
      })
      .where(eq(deliveryInfo.id, existing.id))
      .run();

    db.update(deliveryAddresses)
      .set({
        apartment: input.address.apartment ?? null,
        building: input.address.building,
        street: input.address.street,
        town: input.address.town,
        province: input.address.province,
        state: input.address.state,
      })
      .where(eq(deliveryAddresses.deliveryInfoId, existing.id))
      .run();
  } else {
    const insertedInfo = db
      .insert(deliveryInfo)
      .values({
        basketId,
        fullName: input.fullName,
        phone: input.phone ?? null,
        email: input.email,
      })
      .returning({ id: deliveryInfo.id })
      .get();

    db.insert(deliveryAddresses)
      .values({
        deliveryInfoId: insertedInfo.id,
        apartment: input.address.apartment ?? null,
        building: input.address.building,
        street: input.address.street,
        town: input.address.town,
        province: input.address.province,
        state: input.address.state,
      })
      .run();
  }

  const result = await db.query.deliveryInfo.findFirst({
    where: { basketId },
    with: { address: true },
  });

  if (!result) {
    throw new Error("Failed to load saved delivery info");
  }

  return result;
}