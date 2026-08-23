import Fuse from "fuse.js";
import { db } from "@/db";
import type { Product } from "./productTypes";

export type ProductSort = "name" | "price" | "name_desc" | "price_desc";

export interface ProductQueryOptions {
  categories?: string[];
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: ProductSort;
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function parseProductQuery(
  searchParams: URLSearchParams,
): ProductQueryOptions {
  const filter = searchParams.get("filter");
  const name = searchParams.get("name")?.trim() || undefined;
  const minPriceValue = searchParams.get("min_price");
  const maxPriceValue = searchParams.get("max_price");
  const minPrice = minPriceValue ? Number(minPriceValue) : undefined;
  const maxPrice = maxPriceValue ? Number(maxPriceValue) : undefined;
  const sortBy = searchParams.get("sort_by") as ProductSort | null;

  return {
    categories: filter
      ? filter.split(",").map((category) => category.trim()).filter(Boolean)
      : undefined,
    name,
    minPrice: minPrice !== undefined && Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: maxPrice !== undefined && Number.isFinite(maxPrice) ? maxPrice : undefined,
    sortBy:
      sortBy === "price" ||
      sortBy === "price_desc" ||
      sortBy === "name_desc"
        ? sortBy
        : "name",
  };
}

export async function getProducts(
  options: ProductQueryOptions = {},
): Promise<Product[]> {
  const result = await db.query.products.findMany({
    with: { categories: true },
  });

  let filtered = result as Product[];

  if (options.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= options.maxPrice!);
  }

  if (options.categories && options.categories.length > 0) {
    const categories = options.categories.map(normalize);
    filtered = filtered.filter((product) =>
      product.categories.some(
        (category) =>
          categories.includes(normalize(category.name)) ||
          categories.includes(normalize(category.slug)),
      ),
    );
  }

  if (options.name) {
    const search = new Fuse(filtered, {
      keys: ["name"],
      threshold: 0.5,
      ignoreLocation: true,
    });
    filtered = search.search(options.name).map(({ item }) => item);
  }

  const sortBy = options.sortBy ?? "name";
  return [...filtered].sort((left, right) => {
    if (sortBy === "price" || sortBy === "price_desc") {
      return (left.price - right.price) * (sortBy === "price_desc" ? -1 : 1);
    }

    return (
      left.name.localeCompare(right.name) * (sortBy === "name_desc" ? -1 : 1)
    );
  });
}
