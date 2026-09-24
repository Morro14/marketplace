"use client";
import Image from "next/image";
import demoImg from "@/src/assets/product-demo.jpeg";
import Count from "./Count";
import { heartEmpty, bin } from "./icons";
import {
  calcCost,
  formatCost,
  updateBasketProductData,
} from "@/src/utils/basketUtils";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import { useEffect, useRef, useState } from "react";
import {
  deleteBasketEntry,
  setProductCount,
  type BasketEntry,
} from "@/src/state/basketSlice";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { BasketApiError, deleteProductBasket } from "@/src/api/basket";
import { openAddModal, selectAddModal } from "@/src/state/productsSlice";
import RemoveEntryDialog from "./RemoveEntryDialog";
import AddToFavoritesBtn from "../favorites/AddToFavoritesBtn";

export default function BasketEntry({
  basketEntry,
  index,
  size,
}: {
  basketEntry: BasketEntry;
  index: number;
  size: number;
}) {
  const product = basketEntry.product;
  const entryCostVal = calcCost(product?.price, basketEntry.count);
  const entryCost = entryCostVal ? formatCost(entryCostVal) : "";
  const CURRENCY_SIGN = CURRENCY_SIGNS[CURRENCY];
  const [prevCost, setPrevCost] = useState(entryCostVal);
  const snapPrevCost = useRef(entryCost);
  const costDiv = useRef<null | HTMLDivElement>(null);
  const costDivPrev = useRef<null | HTMLDivElement>(null);
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [isUpdatingBasket, setIsUpdatingBasket] = useState(false);

  const handleRemoveFromCardClick = async () => {
    if (isUpdatingBasket) return;
    setIsUpdatingBasket(true);
    try {
      let status = null;
      status = await deleteProductBasket(basketEntry.productId);
      dispatch(deleteBasketEntry(status.productId));
    } catch (error) {
      console.log("error", error);
      if (
        error instanceof BasketApiError &&
        error.status === 409 &&
        error.data
      ) {
        updateBasketProductData(dispatch, error.data);
        dispatch(
          setProductCount({ productId: basketEntry.productId, count: 1 }),
        );
      } else {
        dispatch(deleteBasketEntry(basketEntry.productId));
      }
    } finally {
      setIsUpdatingBasket(false);
      setRemoveEntry(false);
    }
  };
  // animation
  useEffect(() => {
    if (!costDiv.current || !costDivPrev.current) return;
    if (!entryCostVal || !prevCost) return;
    if (prevCost === entryCostVal) return;
    costDiv.current.style.transitionDuration = "0ms";
    costDiv.current.style.opacity = "0";
    costDivPrev.current.style.transitionDuration = "0ms";
    costDivPrev.current.style.opacity = "1";
    costDivPrev.current.style.translate = "0px 0px";
    if (prevCost < entryCostVal) {
      costDiv.current.style.translate = "0px 28px";
    } else {
      costDiv.current.style.translate = "0px -28px";
    }

    window.requestAnimationFrame(() => {
      if (!costDivPrev.current || !costDiv.current) return;
      costDiv.current.style.transitionDuration = "300ms";
      costDiv.current.style.opacity = "1";
      costDivPrev.current.style.transitionDuration = "300ms";
      costDivPrev.current.style.opacity = "0";
      if (prevCost < entryCostVal) {
        costDiv.current.style.translate = "0px 0px";
        costDivPrev.current.style.translate = "0px -28px";
      } else {
        costDiv.current.style.translate = "0px 0px";
        costDivPrev.current.style.translate = "0px 28px";
      }
    });
    setPrevCost(entryCostVal);
    setTimeout(() => {
      snapPrevCost.current = entryCost;
    }, 300);
  }, [entryCost]);
  const selectModal = useAppSelector(selectAddModal);
  const handleQuickViewClick = () => {
    if (!basketEntry.product) return;
    const dialogEl = document.getElementById(
      "product-add-modal",
    ) as HTMLDialogElement;
    if (!dialogEl) return;
    if (!selectModal.show) {
      dispatch(openAddModal(basketEntry.product));
      dialogEl.showModal();
    }
  };
  const [removeEntry, setRemoveEntry] = useState(false);
  return (
    <div
      className={`basket-entry relative flex flex-col justify-between lg:p-3 p-2 w-full ${index < size ? "border-b border-gray-light" : ""}`}
    >
      {basketEntry.count === 0 || removeEntry ? (
        <RemoveEntryDialog
          confirmAction={handleRemoveFromCardClick}
          cancelAction={() => {
            dispatch(
              setProductCount({
                productId: basketEntry.productId,
                count: 1,
              }),
            );
            setRemoveEntry(false);
          }}
        ></RemoveEntryDialog>
      ) : (
        ""
      )}
      {/* RESPONSIVE */}
      <div className="flex gap-3 h-full justify-between w-full">
        <div className="basket-entry-image rounded-lg overflow-hidden shrink-0">
          <Image
            src={demoImg}
            loading="eager"
            alt="demo-img"
            className="object-cover size-full cursor-pointer"
            onClick={handleQuickViewClick}
          ></Image>
        </div>
        <div className="flex flex-col lg:flex-row grow justify-between lg:pb-1.5">
          <div className="flex flex-col justify-between">
            <div className="text-lg">{product?.name}</div>
            <div className="text-sm/4 text-gray-600">
              {product?.description}
            </div>
            <span className="text-gray-passive text-sm">{`${product?.quantity} ${product?.priceUnit}`}</span>
            <div className="lg:flex hidden gap-2">
              <button className="basket-top-bar-icon__empty relative top-px group">
                <AddToFavoritesBtn
                  productId={basketEntry.productId}
                  variant="thin"
                ></AddToFavoritesBtn>
              </button>
              <button
                onClick={() => setRemoveEntry(true)}
                className="basket-top-bar-icon__empty group opacity-80 hover:opacity-100"
              >
                {bin}
              </button>
            </div>
          </div>
          {/* RESPONSIVE Count */}
          <div className="flex flex-row items-start gap-4 max-lg:w-full max-lg:justify-between">
            {basketEntry.product ? (
              <Count product={basketEntry.product}></Count>
            ) : (
              ""
            )}
            <div className="flex flex-col">
              <div className="flex text-lg text-primary relative gap-1 h-auto">
                <div className="">{CURRENCY_SIGN}</div>
                <div className="w-18">
                  <div
                    className="absolute"
                    style={{
                      transitionProperty: "translate, opacity",
                      transitionDuration: "300ms",
                    }}
                    ref={costDivPrev}
                  >{`${snapPrevCost.current}`}</div>
                  <div
                    className=""
                    style={{
                      transitionProperty: "translate, opacity",
                      transitionDuration: "300ms",
                    }}
                    ref={costDiv}
                  >{`${entryCost}`}</div>
                </div>
              </div>
              <span className="text-gray-passive text-sm">{`${CURRENCY_SIGN}${formatCost(basketEntry.product?.price)} / ${basketEntry.product?.priceUnit}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
