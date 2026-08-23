import { categories_, productsData } from "../src/data/products";
import { slugify } from "../src/utils/general";
import { db } from "./index";
import { basketEntries, categories, products } from "./schema";

function randomStock() {
  return Math.floor(Math.random() * 96) + 5;
}
function clearDB() {
  db.transaction((tx) => {
    tx.delete(basketEntries).run();
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
  });

  console.log(
    `Seeded ${categories_.length} categories and ${productsData.length} products.`,
  );
}
// clearDB();
seed();
