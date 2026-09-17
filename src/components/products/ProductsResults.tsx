"use client";
import { closeAddModal, selectAddModal, setProducts } from "@/src/state/productsSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import ProductCard from "@/src/components/products/ProductCard";
import { useEffect, useRef } from "react";
import ProductAddModal from "@/src/components/products/ProductAddModal";
import type { Product } from "@/src/data/productTypes";
import type { BasketEntryWithProduct } from "@/src/data/basketTypes";
import { BasketEntry, setBasket } from "@/src/state/basketSlice";
import { setFavorites } from "@/src/state/favoritesSlice";
import { populateBasketProductData } from "@/src/utils/basketUtils";

export default function ProductsResults({
  products,
  basket,
  favorites,
}: {
  products: Product[];
  basket: BasketEntry[];
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
    dispatch(setProducts(products));
    dispatch(setFavorites(favorites));
    const basketWithProducts = populateBasketProductData(basket, products);
    dispatch(setBasket(basketWithProducts));
  }, [basket, dispatch, products, favorites]);
  return (
    <div className="products-results h-full flex flex-wrap w-full gap-y-8 sm:gap-x-3 max-sm:justify-between">
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
