import { db } from "@/db";
import ProductsResults from "@/src/components/products/ProductsResults";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await db.query.products.findMany({
    with: { categories: true },
  });

  return <div>{<ProductsResults data={result}></ProductsResults>}</div>;
}
