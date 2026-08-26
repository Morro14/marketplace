import { ProductQueryOptions, ProductSort } from "../data/productQueries";

export function parseProductQuery(
  searchParams: URLSearchParams,
): ProductQueryOptions {
  const categories = searchParams.getAll("cat") || undefined;
  const name = searchParams.get("name")?.trim() || undefined;
  const minPriceValue = searchParams.get("min_price");
  const maxPriceValue = searchParams.get("max_price");
  const minPrice = minPriceValue ? Number(minPriceValue) : undefined;
  const maxPrice = maxPriceValue ? Number(maxPriceValue) : undefined;
  const sortBy = searchParams.get("sort_by") as ProductSort | null;
  return {
    categories: categories,
    name,
    minPrice:
      minPrice !== undefined && Number.isFinite(minPrice)
        ? minPrice
        : undefined,
    maxPrice:
      maxPrice !== undefined && Number.isFinite(maxPrice)
        ? maxPrice
        : undefined,
    sortBy:
      sortBy === "price" || sortBy === "priceDesc" || sortBy === "nameDesc"
        ? sortBy
        : "name",
  };
}
