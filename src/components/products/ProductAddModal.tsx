"use client";
import { Product } from "@/src/data/products";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import CountBtn from "../CountBtn";
import { useState } from "react";
import Chip from "./nav/Chip";
import { crossMediumNoBg, heartEmpty } from "../svg/assets";

export default function ProductAddModal({
  product,
  closeModalAction,
}: {
  product: Product;
  closeModalAction: () => void;
}) {
  const currency = CURRENCY_SIGNS[CURRENCY];
  const [emblaRef] = useEmblaCarousel({ loop: true });
  const [count, setCount] = useState(1);
  const addCount = () => {
    setCount(count + 1);
  };
  const subtractCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const t = useTranslations();
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
                label={cat}
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
            <div>{`(${product.price_unit})`}</div>
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
            <CountBtn
              img="minus"
              callback={subtractCount}
              status={count > 1 ? "active" : "inactive"}
            ></CountBtn>
            <div className="text-xl font-mdeium">{count}</div>
            <CountBtn
              img="plus"
              callback={addCount}
              status="active"
              params={{ autoFocus: true }}
            ></CountBtn>
          </div>
        </div>
        {/* PRICE */}
        <div className="">
          <div className="text-sm text-gray-500">
            {t(`Price for ${count} units`)}
          </div>
          <div className="font-medium text-lg text-accent-green">{`${currency} ${Math.round(product.price * 100 * count) / 100}`}</div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-3">
          <button className="h-8 px-9 border border-primary bg-accent">
            {t("Confirm")}
          </button>
          <button
            onClick={closeModalAction}
            className="h-8 px-9 border border-primary bg-gray-light"
          >
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
