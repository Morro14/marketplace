import { getProductsFromSearchParams } from "@/src/data/productQueries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getProductsFromSearchParams(searchParams);

  return Response.json(products);
}