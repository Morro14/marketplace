import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";

type SortOption = "name" | "price" | "price_desc";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;

  const { searchParams } = new URL(request.url);

  const sort = (searchParams.get("sort") as SortOption | null) ?? "name";

  const categoryRecord = await db.query.categories.findFirst({
    where: {
      name: category,
    },
  });

  if (!categoryRecord) {
    return Response.json({ error: "Category not found" }, { status: 404 });
  }

  let orderBy;

  switch (sort) {
    case "price":
      orderBy = asc(products.price);
      break;

    case "price_desc":
      orderBy = desc(products.price);
      break;

    case "name":
    default:
      orderBy = asc(products.name);
      break;
  }

  const result = await db.query.products.findMany({
    columns: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      quantity: true,
      stock: true,
      priceUnit: true,
    },
    with: {
      categories: true,
    },
  });

  return Response.json(result);
}
