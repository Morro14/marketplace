"use client";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorited,
} from "@/src/state/favoritesSlice";
import {
  addToFavorites as addToFavoritesApi,
  removeFromFavorites as removeFromFavoritesApi,
} from "@/src/api/favorites";
import { useState } from "react";

export default function AddToFavoritesBtn({
  productId,
  variant = "main",
}: {
  productId: number;
  variant?: "main" | "thin";
}) {
  const dispatcher = useAppDispatch();
  const isFavorited = useAppSelector(selectIsFavorited(productId));
  const [isUpdatingFavorites, setIsUpdatingFavorites] = useState(false);

  const handleFavoriteClick = async () => {
    if (isUpdatingFavorites) return;

    const previousFavoritedState = isFavorited;
    const nextFavoritedState = !previousFavoritedState;

    // Optimistic update
    if (nextFavoritedState) {
      dispatcher(addFavorite(productId));
    } else {
      dispatcher(removeFavorite(productId));
    }

    setIsUpdatingFavorites(true);
    try {
      if (nextFavoritedState) {
        await addToFavoritesApi(productId);
      } else {
        await removeFromFavoritesApi(productId);
      }
    } catch {
      // Revert on failure
      if (previousFavoritedState) {
        dispatcher(addFavorite(productId));
      } else {
        dispatcher(removeFavorite(productId));
      }
    } finally {
      setIsUpdatingFavorites(false);
    }
  };
  const heartEmpty = (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 20.5C8.18968 17.0049 2.5 12.4611 2.5 7.56794C2.5 4.94662 4.56897 2.5 7.5 2.5C9.74138 2.5 10.9483 3.37379 12.5 5.29611C13.8793 3.37379 15.2586 2.5 17.5 2.5C20.431 2.5 22.5 4.94662 22.5 7.56794C22.5 12.4611 16.8103 17.0049 12.5 20.5Z"
        fill="white"
        stroke="white"
        strokeWidth="5"
      />
      <path
        className={`group-hover/heart:stroke-[#FF766D] stroke-gray-passive transition-colors duration-150`}
        d="M12.5 20.5C8.18968 17.0049 2.5 12.4611 2.5 7.56794C2.5 4.94662 4.56897 2.5 7.5 2.5C9.74138 2.5 10.9483 3.37379 12.5 5.29611C13.8793 3.37379 15.2586 2.5 17.5 2.5C20.431 2.5 22.5 4.94662 22.5 7.56794C22.5 12.4611 16.8103 17.0049 12.5 20.5Z"
        strokeWidth="2"
      />
    </svg>
  );
  const heartFilled = (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 20.5C8.18968 17.0049 2.5 12.4611 2.5 7.56794C2.5 4.94662 4.56897 2.5 7.5 2.5C9.74138 2.5 10.9483 3.37379 12.5 5.29611C13.8793 3.37379 15.2586 2.5 17.5 2.5C20.431 2.5 22.5 4.94662 22.5 7.56794C22.5 12.4611 16.8103 17.0049 12.5 20.5Z"
        stroke="white"
        strokeWidth="5"
      />
      <path
        d="M12.5 20.5C8.18968 17.0049 2.5 12.4611 2.5 7.56794C2.5 4.94662 4.56897 2.5 7.5 2.5C9.74138 2.5 10.9483 3.37379 12.5 5.29611C13.8793 3.37379 15.2586 2.5 17.5 2.5C20.431 2.5 22.5 4.94662 22.5 7.56794C22.5 12.4611 16.8103 17.0049 12.5 20.5Z"
        fill="#FF766D"
        stroke="#FF766D"
        strokeWidth="2"
      />
    </svg>
  );
  const heartEmptyThin = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 14.5C4.76726 11.7816 0.5 8.24756 0.5 4.44173C0.5 2.40293 2.05172 0.5 4.25 0.5C5.93103 0.5 6.83621 1.17961 8 2.67475C9.03448 1.17961 10.069 0.5 11.75 0.5C13.9483 0.5 15.5 2.40293 15.5 4.44173C15.5 8.24756 11.2327 11.7816 8 14.5Z" />
    </svg>
  );
  const heartFilledThin = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="#FF766D"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 14.5C4.76726 11.7816 0.5 8.24756 0.5 4.44173C0.5 2.40293 2.05172 0.5 4.25 0.5C5.93103 0.5 6.83621 1.17961 8 2.67475C9.03448 1.17961 10.069 0.5 11.75 0.5C13.9483 0.5 15.5 2.40293 15.5 4.44173C15.5 8.24756 11.2327 11.7816 8 14.5Z" />
    </svg>
  );
  const variants = {
    main: { empty: heartEmpty, filled: heartFilled },
    thin: { empty: heartEmptyThin, filled: heartFilledThin },
  };
  return (
    <div
      onClick={handleFavoriteClick}
      className={`group-hover:opacity-100 ${variant === "main" ? "opacity-50" : "opacity-80"} group/heart cursor-pointer transition-opacity duration-150 ${
        isUpdatingFavorites ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isFavorited ? variants[variant].filled : variants[variant].empty}
    </div>
  );
}
