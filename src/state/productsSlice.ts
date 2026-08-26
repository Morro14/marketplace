import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import type { Category, Product } from "../data/productTypes";
import type { ProductSort } from "../data/productQueries";

export type ProductFilters = {
  categories?: Category[];
  maxPrice?: number;
  minPrice?: number;
  name?: string;
};

interface ProductsState {
  // categories are expected as slugString[]
  filters: ProductFilters;
  interface: {
    categoriesSelected: Category[];
    addModal: {
      show: boolean;
      product: Product | null;
    };
  };
  sortBy: ProductSort;
}

const initialState: ProductsState = {
  filters: {
    categories: [],
  },
  interface: {
    categoriesSelected: [],
    addModal: { show: false, product: null },
  },
  sortBy: "name",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoriesConfirmed(state, action: PayloadAction<Category[]>) {
      state.filters.categories = action.payload;
    },

    setCategoriesSelected(state, action: PayloadAction<Category[]>) {
      state.interface.categoriesSelected = action.payload;
    },

    setPriceRange(
      state,
      action: PayloadAction<{
        min: number;
        max: number;
      }>,
    ) {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
    },

    setSortBy(state, action: PayloadAction<ProductSort>) {
      state.sortBy = action.payload;
    },
    setFilters(state, action: PayloadAction<ProductFilters>) {
      state.filters = action.payload;
    },

    resetFilters(state) {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    },
    openAddModal(state, action: PayloadAction<Product | null>) {
      state.interface.addModal.show = true;
      state.interface.addModal.product = action.payload;
    },
    closeAddModal(state) {
      state.interface.addModal.show = false;
      state.interface.addModal.product = null;
    },
  },
});

export const selectCategoriesConfirmed = (state: RootState) =>
  state.products.filters.categories;

export const selectFilters = (state: RootState) => state.products.filters;

export const selectCategoriesSelected = (state: RootState) =>
  state.products.interface.categoriesSelected;

export const selectProductFilter = (state: RootState) => state.products.filters;

export const selectAddModal = (state: RootState) =>
  state.products.interface.addModal;

export const {
  setCategoriesConfirmed,
  setCategoriesSelected,
  setPriceRange,
  setSortBy,
  setFilters,
  openAddModal,
  closeAddModal,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
