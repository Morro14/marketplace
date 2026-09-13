"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  setCategoriesSelected,
  setFilters,
  selectFilters,
} from "@/src/state/productsSlice";
import plusIcon from "@/src/assets/plus-icon-tiny.svg";
import crossIcon from "@/src/assets/cross-icon-tiny.svg";
import Image from "next/image";
import ProductsCatModal from "./ProductsCatModal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/i18n/navigations";
import { Category } from "@/src/data/productTypes";
import type { ProductFilters } from "@/src/state/productsSlice";
import { parseProductQuery } from "@/src/utils/parseParams";

export default function ProductsCarFilter({
  categories,
}: {
  categories: Category[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const categoriesParams = categories;
  useEffect(() => {
    const params = parseProductQuery(searchParams);
    const { categories, ...rest } = params;
    const filters: ProductFilters = {
      ...rest,
      categories: categoriesParams.filter((cat) =>
        params.categories?.includes(cat.slug),
      ),
    };
    dispatch(setFilters(filters));
  }, []);
  const [openCatsModal, setOpenCatsModal] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const handleCatButtonClick = () => {
    if (!modalRef.current) return;
    if (!openCatsModal) {
      modalRef.current.showModal();
      setOpenCatsModal(true);
    } else {
      modalRef.current.close();
      setOpenCatsModal(false);
    }
  };
  const closeModal = () => {
    modalRef.current?.close();
    setOpenCatsModal(false);
  };
  const filters = useAppSelector(selectFilters);
  const isCatConfirmed = filters.categories && filters.categories.length > 0;
  const clearCategoryQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cat");
    router.replace(`/products?${params.toString()}`);
  };
  return (
    <div className="font-medium">
      <button
        className={`category-filter-btn category-filter-btn--filled flex items-center h-8
          ${
            isCatConfirmed
              ? "category-filter-btn__filled"
              : "category-filter-btn__empty"
          } 
          `}
      >
        <div
          className={`w-8 h-8 flex flex-shrink-0 ${isCatConfirmed ? "hover:stroke-accent-2-darker-hl" : ""}`}
          onClick={
            isCatConfirmed
              ? () => {
                  dispatch(setFilters({ ...filters, categories: [] }));
                  dispatch(setCategoriesSelected([]));
                  clearCategoryQuery();
                }
              : handleCatButtonClick
          }
        >
          {isCatConfirmed ? (
            <Image
              className="m-auto"
              src={crossIcon}
              alt="cross-icon-tiny"
            ></Image>
          ) : (
            <Image
              className="m-auto"
              src={plusIcon}
              alt="plus-icon-tiny"
            ></Image>
          )}
        </div>
        <span
          onClick={handleCatButtonClick}
          className="text-nowrap text-primary-darker size-full flex items-center"
        >
          <span className="pr-4 text-sm">{t("Categories")}</span>
        </span>
      </button>
      {/* responsive */}
      <dialog
        onClose={() => setOpenCatsModal(false)}
        closedby="any"
        ref={modalRef}
        className="bg-bg m-auto"
      >
        <ProductsCatModal
          cats={categories}
          closeModalAction={closeModal}
        ></ProductsCatModal>
      </dialog>
    </div>
  );
}
