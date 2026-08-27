"use client";
import { closeAddModal, selectAddModal } from "@/src/state/productsSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import ProductCard from "@/src/components/products/ProductCard";
import { useEffect, useRef } from "react";
import ProductAddModal from "@/src/components/products/ProductAddModal";
import type { Product } from "@/src/data/productTypes";
import type { BasketEntry } from "@/src/data/basketTypes";
import { selectBasket, setBasket } from "@/src/state/basketSlice";

export default function ProductsResults({
  products,
  basket,
}: {
  products: Product[];
  basket: BasketEntry[];
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const selectModal = useAppSelector(selectAddModal);
  const basketState = useAppSelector(selectBasket);
  const dispatch = useAppDispatch();
  const handleCloseModalClick = () => {
    if (!modalRef.current) return;
    if (selectModal.show) {
      modalRef.current.close();
      dispatch(closeAddModal());
    }
  };
  useEffect(() => {
    dispatch(setBasket(basket));
  }, [basket, dispatch]);
  return (
    <div className="h-full grid gap-x-4 gap-y-8 2xl:grid-cols-6 w-full">
      <dialog
        id={`product-add-modal`}
        onClose={() => dispatch(closeAddModal())}
        closedby="any"
        ref={modalRef}
        className="bg-bg m-auto starting:opacity-0"
      >
        {selectModal.product ? (
          <ProductAddModal
            product={selectModal.product}
            closeModalAction={handleCloseModalClick}
          ></ProductAddModal>
        ) : (
          <>No product</>
        )}
      </dialog>
      {products.map((p, i) => (
        <ProductCard
          product={p}
          productCount={
            basketState.find((entry) => entry.productId === p.id)?.count
          }
          key={`product-card-${i}`}
        ></ProductCard>
      ))}
    </div>
  );
}
