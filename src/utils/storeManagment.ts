// import { Product } from "../data/products";
// import { objDeepMerge, objDeepSubtract } from "../utils/general";
// import type { DeepPartial } from "../utils/general";
//
// const STORE_NAME = "test_store";
//
// type BasketState = {
//   entries: { id: string; product: Product; count: number }[];
// };
// type Model = {
//   name: string;
//   entries: [Record<any, any>];
//   fields: Record<any, any>;
// };
//
// export interface Store {
//   name: string;
//   models: Model[];
// }
//
// const defaultState: DeepPartial<Store> = {
//   name: STORE_NAME,
//   models: [
//     { name: "basket", entries: [], fields: { product: null, count: null } },
//   ],
// };
// class StoreStateManager {
//   store: Store;
//   constructor(store: Store) {
//     this.store = store;
//   }
//   updateStore(payload: DeepPartial<Store>) {
//     return objDeepMerge(this.store, payload);
//   }
//   deleteEntries(payload: DeepPartial<Store>) {
//     return objDeepSubtract(this.store, payload, defaultState);
//   }
//   deleteFromEntries(model: keyof Store, id: string) {
//     return this.store.models[model].entries.filter((item) => item.id !== id);
//   }
//   updateStorage() {
//     localStorage.setItem();
//   }
// }
// export class StoreManager {
//   store: Store;
//   stateManager: StoreStateManager;
//   constructor(storeName: string) {
//     this.store = this.getOrCreateStore(storeName);
//     this.stateManager = new StoreStateManager(this.store);
//   }
//   updateStore(payload: Partial<Store>) {
//     this.stateManager.updateStore(payload);
//   }
//   getStore(payload: DeepPartial<Store>) {
//     this.stateManager.deleteEntries(payload);
//   }
//   getOrCreateStore(name: string) {
//     let store = window.localStorage.getitem(name);
//     if (!store) {
//       const defaultValue = { basket: [] };
//       window.localStorage.setItem(name, JSON.stringify(defaultValue));
//       store = defaultValue;
//     }
//     return store;
//   }
// }
