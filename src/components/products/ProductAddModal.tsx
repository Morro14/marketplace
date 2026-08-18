"use client";
import { Product } from "@/src/data/products";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import useEmblaCarousel from "embla-carousel-react";
import QuickViewBtn from "./QuickViewBtn";
import { useTranslations } from "next-intl";
import CountBtn from "../CountBtn";
import { useState } from "react";

export default function ProductAddModal({
  product,
  closeModalAction,
}: {
  product: Product;
  closeModalAction: () => void;
}) {
  const catLength = product.categories.length;
  const currency = CURRENCY_SIGNS[CURRENCY];
  const catDivider = "/";
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
    <div className="md:w-180">
      {/* MEDIA CAROUSEL */}
      <div className="embla__viewport h-70 w-full" ref={emblaRef}>
        <div className="embla__container h-full">
          <div className="embla__slide relative w-[266px] bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative w-[266px] bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative w-[266px] bg-linear-65 from-gray-200 to-gray-100"></div>
          <div className="embla__slide relative w-[266px] bg-linear-65 from-gray-200 to-gray-100"></div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* CONTENT */}
        <div className="flex flex-col gap-2">
          {/* PRICE */}
          <div className="flex items-center gap-1">
            <div className="font-medium text-lg text-accent-green">{`${currency} ${product.price}`}</div>
            <div>{`(${product.price_unit})`}</div>
          </div>
          {/* NAME & CATEGORIES */}
          <div>
            <div className="font-serif text-lg">{product.name}</div>
            <div className="flex font-sans text-xs text-gray-500 italic">
              {product.categories.map((cat, i) => {
                return (
                  <span
                    className="whitespace-pre-wrap"
                    key={`product-card-${product.slug}-cat-${i}`}
                  >
                    {catLength > 1 && i < catLength - 1
                      ? `${cat} ${catDivider} `
                      : cat}
                  </span>
                );
              })}
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="text-sm font-serif text-ellipsis">
            {product.description}
          </div>
        </div>

        {/* COUNT */}
        <div className="">
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
          <button className="h-8 px-9 border border-primary bg-gray-light">
            {t("Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
