"use client";
import { selectBasketCount } from "@/src/state/basketSlice";
import { useAppSelector } from "@/src/state/hooks";
import { useTranslations } from "next-intl";
import { bin } from "./icons";
import { heartEmptyBasket } from "../svg/assets";

export default function TopBar() {
  const t = useTranslations("TopBar");
  const basketCount = useAppSelector(selectBasketCount);
  return (
    <div className="h-[43px] bg-blue-black text-white font-semibold shrink-0 flex justify-between md:w-full w-screen max-md:absolute max-md:left-0 items-center md:rounded-t-xl px-3">
      <span className="font-serif text-lg">{t("title")}</span>
      <div className="flex gap-4">
        <span>{t("items", { count: basketCount })}</span>
        <div className="flex items-center gap-3">
          <div className="basket-top-bar-favorites-icon__empty  relative top-px w-[16px] h-[16px] group">
            {heartEmptyBasket}
          </div>
          <div>{bin}</div>
        </div>
      </div>
    </div>
  );
}
