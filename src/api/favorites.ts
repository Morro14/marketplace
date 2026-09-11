export interface FavoritesResponse {
  success: boolean;
  productId: number;
}

export class FavoritesApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "FavoritesApiError";
  }
}

export async function addToFavorites(productId: number) {
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new FavoritesApiError(
      response.status,
      body?.error ?? "Unable to add to favorites",
    );
  }
  return (await response.json()) as FavoritesResponse;
}

export async function removeFromFavorites(productId: number) {
  const response = await fetch("/api/favorites", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new FavoritesApiError(
      response.status,
      body?.error ?? "Unable to remove from favorites",
    );
  }
  return (await response.json()) as FavoritesResponse;
}
