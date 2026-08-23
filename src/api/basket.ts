// import { Product } from "../data/products";
// import { StoreManager } from "../utils/storeManagment";
//
// // temp api requests with LocalStorage backend
// const store = new StoreManager("test_store");
// export function updateBasket(product: Product, count: number) {
//   store.stateManager.updateStore({
//     basket: {
//       entries: [{ id: product.slug, product: product, count: count }],
//     },
//   });
//   console.log(`${count} "${product.slug}" has been added to the basket store`);
// }
//
// export function deleteFromBasket(product: Product, count: number) {
//   const currentEntry = store.store.basket.entries.find(
//     (item) => item.id === product.slug,
//   );
//   if (!currentEntry) return;
//   const currentCount = currentEntry.count;
//   const newCount = Math.max(0, currentCount - count);
//   if (newCount > 0) {
//     store.stateManager.updateStore({
//       basket: {
//         entries: [{ id: product.slug, product: product, count: newCount }],
//       },
//     });
//   } else {
//
//   }
//   console.log(
//     `${count} "${product.slug}" has been deleted from the basket store`,
//   );
// }
