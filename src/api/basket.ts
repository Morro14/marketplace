import { Product } from "@/src/data/productTypes";

export interface ProductBasketStatus {
  productId: number;
  count: number;
  product: Product;
}

export class BasketApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: ProductBasketStatus,
  ) {
    super(message);
    this.name = "BasketApiError";
  }
}

export async function getProductBasketStatus(productId: number) {
  const response = await fetch(`/api/basket/items/${productId}`);
  if (!response.ok) throw new Error("Unable to load basket status");
  return (await response.json()) as ProductBasketStatus;
}

export async function getBasketProductsStock(productIds: number[]) {
  try {
    const statusPromises = productIds.map((id) =>
      getProductBasketStatus(id).catch(() => null),
    );
    const statuses = await Promise.all(statusPromises);

    const stockMap = new Map<number, ProductBasketStatus>();
    statuses.forEach((status) => {
      if (status) {
        stockMap.set(status.productId, status);
      }
    });

    return stockMap;
  } catch {
    throw new Error("Unable to load basket products stock");
  }
}

export async function setProductBasketCount(productId: number, count: number) {
  const response = await fetch(`/api/basket/items/${productId}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ count }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
      data?: ProductBasketStatus;
    } | null;
    throw new BasketApiError(
      response.status,
      body?.error ?? "Unable to update basket",
      body?.data,
    );
  }
  return (await response.json()) as ProductBasketStatus;
}

export async function deleteProductBasket(productId: number) {
  const response = await fetch(`/api/basket/items/${productId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
      data?: ProductBasketStatus;
    } | null;
    throw new BasketApiError(
      response.status,
      body?.error ?? "Unable to remove item from basket",
      body?.data,
    );
  }
  return (await response.json()) as ProductBasketStatus;
}
