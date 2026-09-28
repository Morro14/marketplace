"use client";
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import filterIcon from "@/src/assets/filter-icon.svg";
import { RefObject } from "react";
import { useAppSelector } from "@/src/state/hooks";
import { selectFilters, selectShowFavorites } from "@/src/state/productsSlice";
import { selectFavoritesCount } from "@/src/state/favoritesSlice";

export default function FilterBtn({
  closeAction,
  openAction,
  active,
  buttonRef,
}: {
  closeAction: () => void;
  openAction: () => void;
  active: boolean;
  buttonRef: RefObject<HTMLDivElement | null>;
}) {
  const filters = useAppSelector(selectFilters);
  const favoritesCount = useAppSelector(selectFavoritesCount);
  const favoritesFlag = favoritesCount > 0 ? 1 : 0;
  const showFavorites = useAppSelector(selectShowFavorites);
  return (
    <div ref={buttonRef}>
      <MobileBtnTemplate
        onClick={(e) => {
          if (active) {
            e.stopPropagation();
            closeAction();
          } else {
            openAction();
          }
        }}
      >
        <div className="flex relative size-full rounded-full">
          {(filters.categories && filters.categories?.length > 0) ||
          showFavorites ? (
            <div className="absolute z-11 -top-3.5 left-[14px] rounded-full h-[20px] w-[20px] text-white bg-accent-red outline-2 outline-white">
              <div className="relative top-px text-center text-sm font-sans font-bold">
                {filters.categories?.length || 0 + favoritesFlag}
              </div>
            </div>
          ) : (
            ""
          )}
          <Image
            className="m-auto"
            aria-selected="false"
            src={filterIcon}
            alt="sort-icon"
          ></Image>
        </div>
      </MobileBtnTemplate>
    </div>
  );
}
