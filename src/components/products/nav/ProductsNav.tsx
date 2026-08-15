import CatalogBtn from "./CatalogBtn";
import ProductsCarFilter from "./ProductsCatFilter";
import ProductSearch from "./ProductSearch";

export default function ProductsNav() {
  return (
    <div className="w-full flex gap-1 flex-wrap">
      <CatalogBtn></CatalogBtn>
      <ProductSearch></ProductSearch>
      <ProductsCarFilter></ProductsCarFilter>
    </div>
  );
}
