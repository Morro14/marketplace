"use client";
import type { Product } from "@/src/data/productTypes";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Chip from "./nav/Chip";
import { crossMediumNoBg, heartEmpty } from "../svg/assets";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectProductCount, setProductCount } from "@/src/state/basketSlice";
import { deleteProductBasket, setProductBasketCount } from "@/src/api/basket";
import { isDigits, isEmpty } from "@/src/utils/general";

export default function ProductAddModal({
  product,
  closeModalAction,
}: {
  product: Product;
  closeModalAction: () => void;
}) {
  const currency = CURRENCY_SIGNS[CURRENCY];
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const basketCount = useAppSelector(selectProductCount(product.id));
  const [inputCount, setInputCount] = useState(basketCount);
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [isSaving, setIsSaving] = useState(false);

  const handleAddToCardClick = async () => {
    if (inputCount >= product.stock) return;
    setInputCount(inputCount + 1);
  };
  const handleRemoveFromCardClick = async () => {
    if (inputCount <= 0) return;
    setInputCount(inputCount - 1);
  };
  const confirm = async () => {
    setIsSaving(true);
    try {
      if (inputCount < 0 || inputCount > product.stock) return;
      let status;
      if (inputCount === 0) {
        status = await deleteProductBasket(product.id);
      } else {
        status = await setProductBasketCount(product.id, inputCount);
      }
      dispatch(setProductCount(status));
      closeModalAction();
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="flex justify-between md:w-[970px] outline outline-primary -outline-offset-8 p-4 md:h-150">
      {/* MEDIA CAROUSEL */}
      <div className="embla__viewport w-[464px] h-full" ref={emblaRef}>
        <div className="embla__container h-full w-full">
          <div className="embla__slide relative bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative bg-linear-65 from-gray-200 to-gray-100"></div>
        </div>
      </div>

      <div className="p-0 pl-0! flex flex-col gap-4 w-[464px]">
        {/* NAV */}
        <div className="flex w-full items-start justify-between">
          <div className="flex gap-1">
            {product.categories.map((cat, i) => (
              <Chip
                key={`product-quickview-cat-${i}`}
                variant={{ shape: "rect", bg: "gray", icon: "none" }}
                label={cat.name}
                styleProps={{ height: "20px", fontWeight: 400 }}
              ></Chip>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <div className="h-4">
              {/* placeholder for add to favorite function*/}
              {heartEmpty}
            </div>
            <div
              onClick={closeModalAction}
              className="stroke-gray-500 hover:stroke-primary cursor-pointer h-3.5"
            >
              {crossMediumNoBg}
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="flex flex-col gap-2">
          {/* PRICE */}
          <div className="flex items-center gap-1">
            <div className="font-medium text-lg text-accent-green">{`${currency} ${product.price}`}</div>
            <div>{`(${product.priceUnit})`}</div>
          </div>
          {/* NAME & CATEGORIES */}
          <div className="font-serif text-xl">{product.name}</div>
          {/* DESCRIPTION */}
          <div className="text-sm font-serif text-ellipsis">
            {product.description}
          </div>
        </div>

        {/* COUNT */}
        <div className="space-y-1">
          <div className="text-sm text-gray-500">{t("Unit number")}</div>
          <div className="flex gap-4 items-center">
            <button
              onClick={inputCount > 0 ? handleRemoveFromCardClick : () => {}}
              className={`h-7 w-7 stroke-primary ${inputCount > 0 ? "bg-accent hover:bg-accent-hl" : "bg-gray-light hover:bg-gray-light-hover"}`}
              disabled={inputCount <= 0}
            >
              {minus}
            </button>
            <input
              name="count"
              type="text"
              className="text-xl font-medium w-7 text-center"
              onChange={(e) => {
                let value = null;
                const isDigits_ = isDigits(e.currentTarget.value);
                const isEmpty_ = isEmpty(e.currentTarget.value);
                if (isEmpty_) {
                  value = 0;
                } else if (!isDigits_) {
                  return;
                } else {
                  value = Number(e.currentTarget.value);
                }
                setInputCount(value);
              }}
              value={inputCount}
            ></input>
            <button
              onClick={handleAddToCardClick}
              className={`h-7 w-7 stroke-primary ${inputCount < product.stock ? "bg-accent hover:bg-accent-hl" : "bg-gray-light hover:bg-gray-light-hover"}`}
              disabled={inputCount > product.stock}
            >
              {plus}
            </button>
          </div>
        </div>
        {/* PRICE */}
        <div className="">
          <div className="text-sm text-gray-500">
            {t(`Price for ${inputCount} units`)}
          </div>
          <div className="font-medium text-lg text-accent-green">{`${currency} ${Math.round(product.price * 100 * inputCount) / 100}`}</div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={confirm}
            disabled={isSaving || inputCount > product.stock}
            className="btn__accent h-8 px-9 rounded-lg bg-accent"
          >
            {t("Confirm")}
          </button>
          <button
            onClick={closeModalAction}
            className="btn__secondary h-8 px-9 rounded-lg bg-gray-light"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}

const plus = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="m-auto"
  >
    <path d="M6 0L6 12" strokeWidth="2" />
    <line y1="6" x2="12" y2="6" strokeWidth="2" />
  </svg>
);

const minus = (
  <svg
    width="12"
    height="2"
    viewBox="0 0 12 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="m-auto"
  >
    <line y1="1" x2="12" y2="1" strokeWidth="2" />
  </svg>
);
