import ProductsResults from "@/src/components/products/ProductsResults";
import {
  getProducts,
  getProductsFromSearchParams,
} from "@/src/data/productQueries";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const result = await getProductsFromSearchParams(params);

  return <div>{<ProductsResults data={result}></ProductsResults>}</div>;
}
