import { db } from "@/db";
import CatalogBtn from "./CatalogBtn";
import ProductsCarFilter from "./ProductsCatFilter";
import ProductSearch from "./ProductSearch";

export default async function ProductsNav() {
  const [categories, products] = await Promise.all([
    db.query.categories.findMany({ orderBy: (category, { asc }) => asc(category.name) }),
    db.query.products.findMany({
      columns: { id: true, name: true, slug: true, description: true, price: true, quantity: true, stock: true, priceUnit: true },
      with: { categories: true },
    }),
  ]);

  return (
    <div className="w-full flex gap-4 flex-wrap">
      <CatalogBtn></CatalogBtn>
      <ProductSearch products={products}></ProductSearch>
      <ProductsCarFilter categories={categories}></ProductsCarFilter>
    </div>
  );
}
