"use client";

import { selectFavoritesCount } from "@/src/state/favoritesSlice";
import { useAppSelector } from "@/src/state/hooks";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ShowFavoritesBtn() {
  const t = useTranslations();
  const countSelector = useAppSelector(selectFavoritesCount);
  const router = useRouter();
  const searchParams = useSearchParams();
  const favoritesActive = searchParams.has("favorites", "true");
  const handleShowClick = () => {
    const params = new URLSearchParams(searchParams);
    params.append("favorites", "true");
    router.replace(`/products?${params.toString()}`);
  };
  const handleResetClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("favorites", "true");
    router.replace(`/products?${params.toString()}`);
  };
  return (
    <div>
      {countSelector > 0 && !favoritesActive ? (
        <button
          onClick={handleShowClick}
          className="flex gap-2 border border-red-heart hover:bg-red-heart-super-light rounded-full px-4 h-8"
        >
          {/* <div className="flex bg-red-heart rounded-full w-8 h-8"> */}
          <span className="text font-sans font-medium text-center my-auto pr-0.5">
            ({countSelector})
          </span>
          {/* </div> */}
          <span className="my-auto font-medium">{t("Show favorites")}</span>
        </button>
      ) : favoritesActive ? (
        <button
          onClick={handleResetClick}
          className="flex gap-2 border border-red-heart bg-red-heart-light hover:bg-red-heart-light-hl rounded-full px-4 h-8"
        >
          {/* <div className="flex bg-red-heart rounded-full w-8 h-8"> */}
          <span className="text font-sans font-medium text-center my-auto pr-0.5">
            ({countSelector})
          </span>
          {/* </div> */}
          <span className="my-auto font-medium">{t("Show the rest")}</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
