import { getProducts, parseProductQuery } from "@/src/data/productQueries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await getProducts(parseProductQuery(searchParams));

  return Response.json(products);
}