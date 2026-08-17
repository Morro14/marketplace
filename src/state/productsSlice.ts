import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type SortBy =
  | "category-asc"
  | "category-desc"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export interface ProductFilters {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

interface ProductsState {
  filters: ProductFilters;
  interface: {
    categoriesSelected: string[];
  };
  sortBy: SortBy;
}

const initialState: ProductsState = {
  filters: {
    categories: [],
    minPrice: null,
    maxPrice: null,
  },
  interface: { categoriesSelected: [] },
  sortBy: "name-asc",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategoriesConfirmed(state, action: PayloadAction<string[]>) {
      state.filters.categories = action.payload;
    },

    setCategoriesSelected(state, action: PayloadAction<string[]>) {
      state.interface.categoriesSelected = action.payload;
    },

    setPriceRange(
      state,
      action: PayloadAction<{
        min: number | null;
        max: number | null;
      }>,
    ) {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
    },

    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },

    resetFilters(state) {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
    },
  },
});

export const selectCategoriesConfirmed = (state: RootState) =>
  state.products.filters.categories;

export const selectCategoriesSelected = (state: RootState) =>
  state.products.interface.categoriesSelected;

export const selectProductFilter = (state: RootState) => state.products.filters;

export const {
  setCategoriesConfirmed,
  setCategoriesSelected,
  setPriceRange,
  setSortBy,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
