import { db } from "@/db";
import type { Product } from "./productTypes";

export type ProductSort = "name" | "price" | "nameDesc" | "priceDesc";
export type ProductFilters = "categories" | "name" | "minPrice" | "maxPrice";

export interface ProductQueryOptions {
  categories?: string[];
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: ProductSort;
}
export type ProductQueryFilters = Partial<
  Record<ProductFilters, ProductQueryOptions[ProductFilters]>
>;

export type ProductSearchParams = Record<string, string | string[] | undefined>;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

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

export async function getProductsFromSearchParams(
  searchParams: ProductSearchParams | URLSearchParams,
): Promise<Product[]> {
  const query = new URLSearchParams();

  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => query.append(key, value));
  } else {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item));
      } else if (value !== undefined) {
        query.set(key, value);
      }
    });
  }

  return getProducts(parseProductQuery(query));
}

export async function getProducts(
  options: ProductQueryOptions = {},
): Promise<Product[]> {
  const result = await db.query.products.findMany({
    where: {
      ...(options.name && {
        name: {
          like: `%${options.name}%`,
        },
      }),

      ...(options.minPrice !== undefined && {
        price: {
          gte: options.minPrice,
        },
      }),

      ...(options.maxPrice !== undefined && {
        price: {
          lte: options.maxPrice,
        },
      }),

      ...(options.categories?.length && {
        categories: {
          slug: {
            in: options.categories,
          },
        },
      }),
    },

    with: {
      categories: true,
    },
  });
  return result;
}
