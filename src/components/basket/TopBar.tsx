"use client";
import { selectBasketCount } from "@/src/state/basketSlice";
import { useAppSelector } from "@/src/state/hooks";
import { useTranslations } from "next-intl";
import { heartEmpty, bin } from "./icons";

export default function TopBar() {
  const t = useTranslations("TopBar");
  const basketCount = useAppSelector(selectBasketCount);
  return (
    <div className="h-10 bg-gray-light flex justify-between w-full items-center rounded-t-xl px-3">
      <span className="font-serif text-lg">{t("title")}</span>
      <div className="flex gap-4">
        <span>{t("items", { count: basketCount })}</span>
        <div className="flex items-center gap-3">
          <div className="relative top-px">{heartEmpty}</div>
          <div>{bin}</div>
        </div>
      </div>
    </div>
  );
}
