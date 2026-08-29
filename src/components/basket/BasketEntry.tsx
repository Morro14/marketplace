"use client";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectProductCount, setProductCount } from "@/src/state/basketSlice";
import { deleteProductBasket, setProductBasketCount } from "@/src/api/basket";
import { Product } from "@/src/data/productTypes";
import Image from "next/image";
import demoImg from "@/src/assets/product-demo.jpeg";
import { BasketEntryWithProduct } from "@/src/data/basketTypes";

export default function BasketEntry({
  basketEntry,
}: {
  basketEntry: BasketEntryWithProduct;
}) {
  const product = basketEntry.product;
  const currency = CURRENCY_SIGNS[CURRENCY];
  const basketCount = useAppSelector(selectProductCount(product.id));
  const [inputCount, setInputCount] = useState(basketCount || 1);
  const dispatch = useAppDispatch();
  const t = useTranslations();
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingBasket, setIsUpdatingBasket] = useState(false);

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
    <div className="flex p-3 gap-3">
      <Image src={demoImg} alt="demo-img"></Image>
      <div className="flex flex-col">
        <span className="font-serif text-lg">{product.name}</span>
        <span className="">{product.description}</span>
      </div>
    </div>
  );
}
