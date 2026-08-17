import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  sortBy: SortBy;
}

const initialState: ProductsState = {
  filters: {
    categories: [],
    minPrice: null,
    maxPrice: null,
  },
  sortBy: "name-asc",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.filters.categories = action.payload;
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

export const { setCategories, setPriceRange, setSortBy, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
