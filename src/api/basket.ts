import { Product } from "../data/products";
import { objDeepMerge, objDeepSubtract } from "../utils/general";
import type { DeepPartial } from "../utils/general";

type BasketState = {
  entries: Record<string, { product: Product; count: number }>[];
};

interface Store {
  basket: BasketState;
}
const defaultState: DeepPartial<Store> = { basket: { entries: [] } };

class StoreStateManager {
  store: Store;
  constructor(store: Store) {
    this.store = store;
  }
  updateStore(payload: DeepPartial<Store>) {
    return objDeepMerge(this.store, payload);
  }
  deleteEntries(payload: DeepPartial<Store>) {
    return objDeepSubtract(this.store, payload, defaultState);
  }
}
class StoreManager {
  store: Store;
  stateManager: StoreStateManager;
  constructor(storeName: string) {
    this.store = this.getOrCreateStore(storeName);
    this.stateManager = new StoreStateManager(this.store);
  }
  updateStore(payload: Partial<Store>) {
    this.stateManager.updateStore(payload);
  }
  getStore(payload: DeepPartial<Store>) {
    this.stateManager.deleteEntries(payload);
  }
  getOrCreateStore(name: string) {
    let store = window.localStorage.getitem(name);
    if (!store) {
      const defaultValue = { basket: [] };
      window.localStorage.setItem(name, JSON.stringify(defaultValue));
      store = defaultValue;
    }
    return store;
  }
}

// temp api requests with LocalStorage backend
export function addToBasket(product: Product, count: number) {
  const store = new StoreManager("test_store");
  store.stateManager.updateStore({
    basket: {
      entries: [{ [product.slug]: { product: product, count: count } }],
    },
  });
  return;
}
