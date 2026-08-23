"use client";
import {
  closeAddModal,
  ProductFilters,
  selectAddModal,
  selectProductFilter,
} from "@/src/state/productsSlice";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import ProductCard from "@/src/components/products/ProductCard";
import { useRef } from "react";
import ProductAddModal from "@/src/components/products/ProductAddModal";
import type { Product } from "@/src/data/productTypes";

function filterProducts(data: Product[], filter: ProductFilters) {
  if (filter.categories.length === 0) {
    return data;
  }
  const productsFiltered = data.filter((p) => {
    const productCats = p.categories;
    const productCatsIncluded = productCats.find((pCat) => {
      const isIncluded = filter.categories.find(
        (filterCat) => filterCat === pCat.name,
      );
      return isIncluded;
    });
    return productCatsIncluded;
  });
  return productsFiltered;
}
export default function ProductsResults({
  data,
}: {
  data: Product[];
}) {
  const filter = useAppSelector(selectProductFilter);
  const productsFiltered = filterProducts(data, filter);
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
      {productsFiltered.map((p, i) => (
        <ProductCard product={p} key={`product-card-${i}`}></ProductCard>
      ))}
    </div>
  );
}
