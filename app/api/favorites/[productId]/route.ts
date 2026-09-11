import { removeFromFavorites, isFavorited } from "@/src/data/favoritesQueries";

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

  const isFav = await isFavorited(productId);
  return Response.json({ productId, isFavorited: isFav });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const productId = await getProductId(params);
  if (productId === null) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const success = await removeFromFavorites(productId);
  return Response.json({
    success,
    productId,
  });
}
