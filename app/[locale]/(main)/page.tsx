import ProductsResults from "@/src/components/products/ProductsResults";
import { getProducts } from "@/src/data/productQueries";

export default async function Products() {
  const result = await getProducts();

  console.log("products query data", result);
  return <div>{<ProductsResults data={result}></ProductsResults>}</div>;
}
