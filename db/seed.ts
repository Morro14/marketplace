import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  categories as categoryNames,
  products_,
} from "../src/data/products";
import { categories, productCategories, products } from "./schema";

function randomStock() {
  return Math.floor(Math.random() * 96) + 5;
}

function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const sqlite = new Database(databaseUrl);
  sqlite.pragma("foreign_keys = ON");
  const db = drizzle(sqlite);

  db.transaction((tx) => {
    tx.delete(productCategories).run();
    tx.delete(products).run();
    tx.delete(categories).run();

    const insertedCategories = tx
      .insert(categories)
      .values(categoryNames.map((name) => ({ name })))
      .returning({ id: categories.id, name: categories.name })
      .all();

    const categoryIdByName = new Map(
      insertedCategories.map((category) => [category.name, category.id]),
    );

    const insertedProducts = tx
      .insert(products)
      .values(
        products_.map((product) => ({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          stock: randomStock(),
          priceUnit: product.price_unit,
        })),
      )
      .returning({ id: products.id, name: products.name })
      .all();

    const productIdByName = new Map(
      insertedProducts.map((product) => [product.name, product.id]),
    );

    const links = products_.flatMap((product) => {
      const productId = productIdByName.get(product.name);
      if (productId === undefined) {
        throw new Error(`Missing inserted product: ${product.name}`);
      }

      return product.categories.map((categoryName) => {
        const categoryId = categoryIdByName.get(categoryName);
        if (categoryId === undefined) {
          throw new Error(`Unknown category: ${categoryName}`);
        }

        return { productId, categoryId };
      });
    });

    if (links.length > 0) {
      tx.insert(productCategories).values(links).run();
    }
  });

  sqlite.close();

  console.log(
    `Seeded ${categoryNames.length} categories and ${products_.length} products.`,
  );
}

seed();
