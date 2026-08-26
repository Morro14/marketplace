"use client";
import type { Product } from "@/src/data/productTypes";
import demoImg from "@/src/assets/product-demo.jpeg";
import Image from "next/image";
import { slugify } from "@/src/utils/general";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import cartIcon from "@/src/assets/cart-icon.svg";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectProductCount, setProductCount } from "@/src/state/basketSlice";
import { deleteProductBasket, setProductBasketCount } from "@/src/api/basket";
import { useState } from "react";
import { openAddModal, selectAddModal } from "@/src/state/productsSlice";
import QuickViewBtn from "./QuickViewBtn";

export default function ProductCard({ product }: { product: Product }) {
  const nameSlug = slugify(product.name);

  const catDivider = "/";
  const catLength = product.categories.length;
  const currency = CURRENCY_SIGNS[CURRENCY];
  const t = useTranslations();
  const selectModal = useAppSelector(selectAddModal);
  const basketCount = useAppSelector(selectProductCount(product.id));
  const dispatch = useAppDispatch();
  const [isUpdatingBasket, setIsUpdatingBasket] = useState(false);
  const handleQuickViewClick = () => {
    const dialogEl = document.getElementById(
      "product-add-modal",
    ) as HTMLDialogElement;
    if (!dialogEl) return;
    if (!selectModal.show) {
      dispatch(openAddModal(product));
      dialogEl.showModal();
    }
  };
  const handleAddToCardClick = async () => {
    if (isUpdatingBasket || basketCount >= product.stock) return;
    const previousCount = basketCount;
    const nextCount = previousCount + 1;
    dispatch(setProductCount({ productId: product.id, count: nextCount }));
    setIsUpdatingBasket(true);
    try {
      const status = await setProductBasketCount(product.id, nextCount);
      dispatch(setProductCount(status));
    } catch {
      dispatch(
        setProductCount({ productId: product.id, count: previousCount }),
      );
    } finally {
      setIsUpdatingBasket(false);
    }
  };
  const handleRemoveFromCardClick = async () => {
    if (isUpdatingBasket || basketCount >= product.stock) return;
    const previousCount = basketCount;
    const nextCount = previousCount - 1;
    dispatch(setProductCount({ productId: product.id, count: nextCount }));
    setIsUpdatingBasket(true);
    try {
      let status = null;
      if (nextCount === 0) {
        status = await deleteProductBasket(product.id);
      } else {
        status = await setProductBasketCount(product.id, nextCount);
      }
      dispatch(setProductCount(status));
    } catch {
      dispatch(
        setProductCount({ productId: product.id, count: previousCount }),
      );
    } finally {
      setIsUpdatingBasket(false);
    }
  };
  return (
    <div className="flex flex-col md:w-[230px] w-45 md:h-[396px] h-90 drop-shadow bg-bg justify-between pb-2 group">
      <div className="relative">
        <Image
          src={demoImg}
          className="md:h-[231px] h-[226px] w-full object-cover"
          alt={`product-card-img-${nameSlug}`}
        ></Image>
        <div className="absolute bottom-1.5 left-1.5">
          <QuickViewBtn
            handleQuickViewClick={handleQuickViewClick}
          ></QuickViewBtn>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-1">
        <div className="flex flex-col gap-0.5 px-2 py-1.5">
          <div>
            {/* NAME */}
            <div className="font-serif">{product.name}</div>
            {/* CATEGORIES */}
            <div className="flex font-sans text-xs text-gray-500 italic">
              {product.categories.map((cat, i) => {
                return (
                  <span
                    className="whitespace-pre-wrap"
                    key={`product-card-${nameSlug}-cat-${i}`}
                  >
                    {catLength > 1 && i < catLength - 1
                      ? `${cat.name} ${catDivider} `
                      : cat.name}
                  </span>
                );
              })}
            </div>
          </div>
          {/* DESCRIPTION */}
          <div className="text-sm font-serif text-ellipsis overflow-hidden h-5">
            {product.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {/* PRICE */}
        <div className="flex px-2.5 items-center gap-1">
          <div className="font-medium text-lg text-accent-green">{`${currency} ${product.price}`}</div>
          <div>{`(${product.priceUnit})`}</div>
        </div>
        {!basketCount || basketCount === 0 ? (
          <button
            onClick={handleAddToCardClick}
            disabled={isUpdatingBasket || basketCount >= product.stock}
            className="mx-2 flex gap-0.5 items-center justify-center bg-accent md:h-8 md:border md:border-primary"
          >
            <Image src={cartIcon} alt={`card-icon`}></Image>
            <span>{t("Add to cart")}</span>
            {basketCount > 0 && <span>({basketCount})</span>}
          </button>
        ) : (
          <div className="mx-2 flex gap-0.5 items-center justify-between px-3 bg-gray-light hover:bg-gray-light-hover md:h-8 md:border md:border-primary">
            <button
              className="w-5 h-5 stroke-gray-mid hover:stroke-primary"
              onClick={handleRemoveFromCardClick}
            >
              {minus}
            </button>
            <div>{basketCount > 0 && <span>{basketCount}</span>}</div>
            <button
              className="w-5 h-5 stroke-gray-mid hover:stroke-primary"
              onClick={handleAddToCardClick}
            >
              {plus}
            </button>
          </div>
        )}
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
    <path d="M6 0L6 12" stroke-width="2" />
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
