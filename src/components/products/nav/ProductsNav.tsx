import { db } from "@/db";
import { getProducts } from "@/src/data/productQueries";
import CatalogBtn from "./CatalogBtn";
import ProductsCarFilter from "./ProductsCatFilter";
import ProductSearch from "./ProductSearch";
import ShowFavoritesBtn from "../../favorites/ShowFavoritesBtn";

export default async function ProductsNav() {
  const [categories, products] = await Promise.all([
    db.query.categories.findMany({
      orderBy: (category, { asc }) => asc(category.name),
    }),
    getProducts(),
  ]);
  return (
    <div className="w-full flex gap-4 flex-wrap">
      <CatalogBtn categories={categories}></CatalogBtn>
      <ProductSearch products={products}></ProductSearch>
      <ProductsCarFilter categories={categories}></ProductsCarFilter>{" "}
      <ShowFavoritesBtn></ShowFavoritesBtn>
    </div>
  );
}
