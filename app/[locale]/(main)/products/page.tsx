import ProductsResults from "@/src/components/products/ProductsResults";
import { getBasketWithProducts } from "@/src/data/basketQueries";
import { getFavoriteIds } from "@/src/data/favoritesQueries";
import { getProductsFromSearchParams } from "@/src/data/productQueries";
import { type SearchParams } from "@/src/types/general";

export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const products = await getProductsFromSearchParams(params);
  const basket = await getBasketWithProducts();
  const favorites = await getFavoriteIds();
  return (
    <ProductsResults
      products={products}
      basket={basket}
      favorites={favorites}
    ></ProductsResults>
  );
}
