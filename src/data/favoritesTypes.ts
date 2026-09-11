import { favorites } from "@/db/schema";
import { BasketEntryWithProduct } from "./basketTypes";

export type Favorite = typeof favorites.$inferSelect;

export interface FavoritesResponse {
  favorites: BasketEntryWithProduct[];
}

export interface AddFavoriteResponse {
  success: boolean;
  productId: number;
}

export interface RemoveFavoriteResponse {
  success: boolean;
  productId: number;
}

export interface CheckFavoriteResponse {
  productId: number;
  isFavorited: boolean;
}
