export interface ProductBasketStatus {
  productId: number;
  count: number;
  stock: number;
}

export async function getProductBasketStatus(productId: number) {
  const response = await fetch(`/api/basket/items/${productId}`);
  if (!response.ok) throw new Error("Unable to load basket status");
  return (await response.json()) as ProductBasketStatus;
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
    } | null;
    throw new Error(body?.error ?? "Unable to update basket");
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
    } | null;
    throw new Error(body?.error ?? "Unable to remove item from basket");
  }
  return (await response.json()) as ProductBasketStatus;
}
