"use client";
import { selectBasketCount, setBasket } from "@/src/state/basketSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { useTranslations } from "next-intl";
import { bin, heartEmpty } from "./icons";
import { heartEmptyBasket } from "../svg/assets";
import { useRef, useState } from "react";
import { clearBasket } from "@/src/api/basket";

export default function TopBar() {
  const t = useTranslations("TopBar");
  const basketCount = useAppSelector(selectBasketCount);
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const handleClearBasketClick = async () => {
    if (!dialogRef.current) {
      return;
    }
    dispatch(setBasket([]));
    dialogRef.current.close();
    setIsUpdating(true);
    await clearBasket();
    setIsUpdating(false);
  };
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  return (
    <div
      className="basket-top-bar h-[43px] shrink-0 flex justify-between
      items-center px-3"
    >
      <span className="font-serif text-lg">{t("title")}</span>
      <div className="flex gap-4">
        <span>{t("items", { count: basketCount })}</span>
        <div className="flex items-center gap-3">
          <button className="basket-top-bar-icon__empty relative top-px hover:cursor-pointer group">
            {heartEmpty}
          </button>
          <button className="basket-top-bar-icon__empty group" onClick={() => dialogRef.current?.showModal()}>{bin}</button>
        </div>
      </div>
      <dialog ref={dialogRef} className="m-auto py-4 px-6">
        <div className="flex flex-col items-center gap-2 bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150">
          <div className="text-lg">{t("Empty the basket?")}</div>
          {isUpdating ? (
            <span>{t("removing...")}</span>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn__accent px-2 h-7 rounded-lg"
                onClick={handleClearBasketClick}
              >
                {t("Empty")}
              </button>
              <button
                onClick={() => dialogRef.current?.close()}
                className="btn__secondary px-2 h-7 rounded-lg"
              >
                {t("Cancel")}
              </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
