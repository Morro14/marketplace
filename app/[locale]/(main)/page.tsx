import Hero from "@/src/components/index/Hero";
import ProductsNav from "@/src/components/products/nav/ProductsNav";
import ProductsResults from "@/src/components/products/ProductsResults";
import { getBasketWithProducts } from "@/src/data/basketQueries";
import { getFavoriteIds } from "@/src/data/favoritesQueries";
import { getProductsFromSearchParams } from "@/src/data/productQueries";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
    <div className="content-container h-full flex flex-col gap-4 mx-auto">
      <Hero></Hero>
      <ProductsNav></ProductsNav>
      <ProductsResults
        products={products}
        basket={basket}
        favorites={favorites}
      ></ProductsResults>
    </div>
  );
}
