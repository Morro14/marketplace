import { db } from "@/db";
import { getProducts } from "@/src/data/productQueries";
import CatalogBtn from "./CatalogBtn";
import ProductsCarFilter from "./ProductsCatFilter";
import ProductSearch from "./ProductSearch";
import ShowFavoritesBtn from "../../favorites/ShowFavoritesBtn";
import NavIconBar from "./NavIconBar";

export default async function ProductsNav() {
  const [categories, products] = await Promise.all([
    db.query.categories.findMany({
      orderBy: (category, { asc }) => asc(category.name),
    }),
    getProducts(),
  ]);
  return (
    <div className="w-full flex sm:justify-between gap-1">
      <div className="flex gap-4">
        <CatalogBtn categories={categories}></CatalogBtn>
        <ProductSearch products={products}></ProductSearch>
        <div className="gap-4 lg:flex hidden">
          <ProductsCarFilter categories={categories}></ProductsCarFilter>{" "}
          <ShowFavoritesBtn></ShowFavoritesBtn>
        </div>
      </div>
      <div className="lg:hidden sm:flex max-sm:hidden max-sm:pl-px max-sm:w-full">
        <NavIconBar categories={categories}></NavIconBar>
      </div>
    </div>
  );
}
