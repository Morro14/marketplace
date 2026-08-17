"use client";
import { ProductFilters, selectProductFilter } from "@/src/state/productsSlice";
import { useAppSelector } from "@/src/state/hooks";
import { Product, products } from "@/src/data/products";

function filterProducts(products: Product[], filter: ProductFilters) {
  if (filter.categories.length === 0) {
    return products;
  }
  const productsFiltered = products.filter((p) => {
    const productCats = p.categories;
    const productCatsIncluded = productCats.find((pCat) => {
      const isIncluded = filter.categories.includes(pCat);
      return isIncluded;
    });
    return productCatsIncluded;
  });
  return productsFiltered;
}

export default function SearchResults() {
  const filter = useAppSelector(selectProductFilter);
  const productsFiltered = filterProducts(products, filter);

  return (
    <div className="h-full grid 2xl:grid-cols-5 w-full">
      {productsFiltered.map((p, i) => (
        <span key={`product-card-${i}`}>{p.name}</span>
      ))}
    </div>
  );
}
