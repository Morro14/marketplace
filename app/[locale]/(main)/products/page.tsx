import ProductsResults from "@/src/components/products/ProductsResults";
import { getProducts, parseProductQuery } from "@/src/data/productQueries";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.set(key, value);
    }
  });
  const result = await getProducts(parseProductQuery(query));

  return <div>{<ProductsResults data={result}></ProductsResults>}</div>;
}
