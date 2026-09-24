"use client";

import { BasketEntryWithProduct } from "@/src/data/basketTypes";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import { selectBasket, setBasket } from "@/src/state/basketSlice";
import { useEffect, useRef } from "react";
import BasketEntry from "./BasketEntry";
import ProductAddModal from "../products/ProductAddModal";
import { closeAddModal, selectAddModal } from "@/src/state/productsSlice";

export default function Entries({
  basket,
}: {
  basket: BasketEntryWithProduct[];
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBasket(basket));
  }, [basket, dispatch]);

  const handleCloseModalClick = () => {
    if (!modalRef.current) return;
    if (selectModal.show) {
      modalRef.current.close();
      dispatch(closeAddModal());
    }
  };
  const basketState = useAppSelector(selectBasket);
  const selectModal = useAppSelector(selectAddModal);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  return (
    <div className="basket-entries bg-bg rounded-b-lg">
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
          ""
        )}
      </dialog>
      {basketState.map((item, i) => (
        <BasketEntry
          key={`basket-entry-${item.productId}`}
          basketEntry={item}
          index={i}
          size={basket.length}
        ></BasketEntry>
      ))}
    </div>
  );
}
