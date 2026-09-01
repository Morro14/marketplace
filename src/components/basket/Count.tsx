"use client";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  selectProduct,
  selectProductCount,
  setProductCount,
} from "@/src/state/basketSlice";
import {
  deleteProductBasket,
  setProductBasketCount,
  BasketApiError,
} from "@/src/api/basket";
import { formatProductCount } from "@/src/utils/format";
import { updateBasketProductData } from "@/src/utils/basketUtils";
import { Product } from "@/src/data/productTypes";

export default function Count({ product }: { product: Product }) {
  const basketCount = useAppSelector(selectProductCount(product.id));
  const dispatch = useAppDispatch();
  const t = useTranslations("BasketEntry.Count");
  const [isUpdatingBasket, setIsUpdatingBasket] = useState(false);
  const [inputCount, setInputCount] = useState(basketCount);
  const formRef = useRef<HTMLFormElement>(null);

  const [stockExceeded, setStockExceeded] = useState(false);
  const productStock = useAppSelector(selectProduct(product.id))?.stock || 0;

  const handleAddToCardClick = async () => {
    if (isUpdatingBasket || basketCount >= product.stock) return;
    const previousCount = basketCount;
    const nextCount = previousCount + 1;
    dispatch(
      setProductCount({ productId: product.id, count: nextCount, product }),
    );
    setIsUpdatingBasket(true);
    setInputCount(nextCount);
    try {
      const status = await setProductBasketCount(product.id, nextCount);
      updateBasketProductData(dispatch, status);
      setStockExceeded(false);
    } catch (error) {
      if (
        error instanceof BasketApiError &&
        error.status === 409 &&
        error.data
      ) {
        updateBasketProductData(dispatch, error.data);
        setInputCount(error.data.count);
      } else {
        dispatch(
          setProductCount({
            productId: product.id,
            count: previousCount,
            product,
          }),
        );
        setInputCount(previousCount);
        setStockExceeded(true);
      }
    } finally {
      setIsUpdatingBasket(false);
    }
  };

  const handleRemoveFromCardClick = async () => {
    if (isUpdatingBasket || basketCount <= 0) return;
    const previousCount = basketCount;
    const nextCount = previousCount - 1;
    dispatch(
      setProductCount({ productId: product.id, count: nextCount, product }),
    );
    setIsUpdatingBasket(true);
    setInputCount(nextCount);
    try {
      let status = null;
      if (nextCount === 0) {
        status = await deleteProductBasket(product.id);
      } else {
        status = await setProductBasketCount(product.id, nextCount);
      }
      updateBasketProductData(dispatch, status);
      setStockExceeded(false);
    } catch (error) {
      if (
        error instanceof BasketApiError &&
        error.status === 409 &&
        error.data
      ) {
        updateBasketProductData(dispatch, error.data);
        setInputCount(error.data.count);

        setStockExceeded(true);
      } else {
        dispatch(
          setProductCount({
            productId: product.id,
            count: previousCount,
            product,
          }),
        );
        setInputCount(previousCount);
      }
    } finally {
      setIsUpdatingBasket(false);
    }
  };
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const count = formatProductCount(formData.get("count") as string);

    if (count === null) return;

    const previousCount = basketCount;
    dispatch(setProductCount({ productId: product.id, count, product }));
    setIsUpdatingBasket(true);
    if (count !== previousCount) setStockExceeded(false);
    try {
      let status = null;
      if (count === 0) {
        status = await deleteProductBasket(product.id);
      } else {
        status = await setProductBasketCount(product.id, count);
      }
      updateBasketProductData(dispatch, status);
    } catch (error) {
      if (
        error instanceof BasketApiError &&
        error.status === 409 &&
        error.data
      ) {
        updateBasketProductData(dispatch, error.data);
        setInputCount(product.stock);
        setStockExceeded(true);
      } else {
        dispatch(
          setProductCount({
            productId: product.id,
            count: previousCount,
            product,
          }),
        );
      }
    } finally {
      setIsUpdatingBasket(false);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const result = formatProductCount(e.currentTarget.value);
    if (!result) {
      setInputCount(basketCount);
      return;
    }
    formRef.current?.requestSubmit();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(Number(e.currentTarget.value) || 0);
  };
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-4">
        <button
          onClick={inputCount > 0 ? handleRemoveFromCardClick : () => {}}
          className={`h-7 w-7 select-none stroke-primary ${inputCount > 0 ? "bg-accent hover:bg-accent-hl" : "bg-gray-light hover:bg-gray-light-hover"}`}
          disabled={inputCount <= 0}
        >
          {minus}
        </button>
        <form ref={formRef} onSubmit={handleFormSubmit}>
          <input
            name="count"
            type="text"
            className="text-xl font-medium w-7 text-center"
            maxLength={2}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            value={inputCount}
          />
        </form>
        <button
          onClick={handleAddToCardClick}
          className={`h-7 w-7 select-none stroke-primary ${inputCount < product.stock ? "bg-accent hover:bg-accent-hl" : "bg-gray-light hover:bg-gray-light-hover"}`}
          disabled={inputCount > product.stock}
        >
          {plus}
        </button>
      </div>
      {stockExceeded ? (
        <span className="text-sm text-red-warning">
          {t("stock_exceeded_count", { count: productStock })}
        </span>
      ) : (
        ""
      )}
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
