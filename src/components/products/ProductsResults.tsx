"use client";
import { closeAddModal, selectAddModal } from "@/src/state/productsSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import ProductCard from "@/src/components/products/ProductCard";
import { useEffect, useRef } from "react";
import ProductAddModal from "@/src/components/products/ProductAddModal";
import type { Product } from "@/src/data/productTypes";
import type { BasketEntry, BasketEntryWithProduct } from "@/src/data/basketTypes";
import { setBasket } from "@/src/state/basketSlice";

export default function ProductsResults({
  products,
  basket,
}: {
  products: Product[];
  basket: BasketEntry[];
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const selectModal = useAppSelector(selectAddModal);
  const dispatch = useAppDispatch();
  const handleCloseModalClick = () => {
    if (!modalRef.current) return;
    if (selectModal.show) {
      modalRef.current.close();
      dispatch(closeAddModal());
    }
  };
  useEffect(() => {
    const basketWithProducts: BasketEntryWithProduct[] = basket.map((entry) => ({
      productId: entry.productId,
      count: entry.count,
      product: {} as Product,
    }));
    dispatch(setBasket(basketWithProducts));
  }, [basket, dispatch]);
  return (
    <div className="h-full grid w-full grid-cols-[repeat(5,max-content)] justify-between gap-y-8 content-between">
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
        <ProductCard product={p} key={`product-card-${i}`}></ProductCard>
      ))}
    </div>
  );
}
