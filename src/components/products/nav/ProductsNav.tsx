import { db } from "@/db";
import { getProducts } from "@/src/data/productQueries";
import CatalogBtn from "./CatalogBtn";
import ProductsCarFilter from "./ProductsCatFilter";
import ProductSearch from "./ProductSearch";

export default async function ProductsNav() {
  const [categories, products] = await Promise.all([
    db.query.categories.findMany({ orderBy: (category, { asc }) => asc(category.name) }),
    getProducts(),
  ]);

  return (
    <div className="w-full flex gap-4 flex-wrap">
      <CatalogBtn></CatalogBtn>
      <ProductSearch products={products}></ProductSearch>
      <ProductsCarFilter categories={categories}></ProductsCarFilter>
    </div>
  );
}
