"use client";
import { Product } from "@/src/data/products";
import demoImg from "@/src/assets/product-demo.jpeg";
import Image from "next/image";
import { slugify } from "@/src/utils/general";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import cartIcon from "@/src/assets/cart-icon.svg";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { openAddModal, selectAddModal } from "@/src/state/productsSlice";
import QuickViewBtn from "./QuickViewBtn";

export default function ProductCard({ product }: { product: Product }) {
  const nameSlug = slugify(product.name);

  const catDivider = "/";
  const catLength = product.categories.length;
  const currency = CURRENCY_SIGNS[CURRENCY];
  const t = useTranslations();
  const selectModal = useAppSelector(selectAddModal);
  const dispatch = useAppDispatch();
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
  const handleAddToCardCLick = () => {};
  return (
    <div className="flex flex-col md:w-[230px] w-45 md:h-[396px] h-90 border border-gray-400 justify-between pb-2 group">
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
                      ? `${cat} ${catDivider} `
                      : cat}
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
          <div>{`(${product.price_unit})`}</div>
        </div>
        <button
          onClick={handleAddToCardCLick}
          className="mx-2 flex gap-0.5 items-center justify-center bg-accent md:h-8 md:border md:border-primary"
        >
          <Image src={cartIcon} alt={`card-icon`}></Image>
          <span>{t("Add to cart")}</span>
        </button>
      </div>
    </div>
  );
}
