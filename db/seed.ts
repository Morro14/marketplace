import { categories_, productsData } from "../src/data/products";
import { slugify } from "../src/utils/general";
import { db } from "./index";
import {
  basketEntries,
  categories,
  productCategories,
  products,
} from "./schema";

function randomStock() {
  return Math.floor(Math.random() * 96) + 5;
}
function clearDB() {
  db.transaction((tx) => {
    tx.delete(basketEntries).run();
    tx.delete(productCategories).run();
    tx.delete(products).run();
    tx.delete(categories).run();
  });
}
function seed() {
  db.$client.pragma("foreign_keys = ON");

  db.transaction((tx) => {
    tx.delete(basketEntries).run();
    tx.delete(products).run();
    tx.delete(categories).run();

    tx.insert(categories)
      .values(
        categories_.map((name) => ({
          name,
          slug: slugify(name),
        })),
      )
      .run();

    tx.insert(products)
      .values(
        productsData.map((product) => ({
          name: product.name,
          slug: slugify(product.name),
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          stock: randomStock(),
          priceUnit: product.price_unit,
        })),
      )
      .run();

    const seededProducts = tx
      .select({ id: products.id, name: products.name })
      .from(products)
      .all();
    const seededCategories = tx
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .all();
    const productIdByName = new Map(
      seededProducts.map((product) => [product.name, product.id]),
    );
    const categoryIdByName = new Map(
      seededCategories.map((category) => [category.name, category.id]),
    );
    tx.insert(productCategories)
      .values(
        productsData.flatMap((product) =>
          product.categories.map((categoryName) => ({
            productId: productIdByName.get(product.name)!,
            categoryId: categoryIdByName.get(categoryName)!,
          })),
        ),
      )
      .run();
  });

  console.log(
    `Seeded ${categories_.length} categories and ${productsData.length} products.`,
  );
}
// clearDB();
seed();
