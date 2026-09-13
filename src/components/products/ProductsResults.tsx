"use client";
import { closeAddModal, selectAddModal } from "@/src/state/productsSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import ProductCard from "@/src/components/products/ProductCard";
import { useEffect, useRef } from "react";
import ProductAddModal from "@/src/components/products/ProductAddModal";
import type { Product } from "@/src/data/productTypes";
import type { BasketEntryWithProduct } from "@/src/data/basketTypes";
import { setBasket } from "@/src/state/basketSlice";
import { setFavorites } from "@/src/state/favoritesSlice";

export default function ProductsResults({
  products,
  basket,
  favorites,
}: {
  products: Product[];
  basket: BasketEntryWithProduct[];
  favorites: number[];
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
    dispatch(setBasket(basket));
    dispatch(setFavorites(favorites));
  }, [basket, dispatch, products, favorites]);
  return (
    <div className="xl:grid-cols-[repeat(5,max-content)] lg:grid-cols-[repeat(4,max-content)] h-full grid w-full gap-y-8 gap-x-3">
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
