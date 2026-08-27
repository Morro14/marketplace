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
    <div className="flex flex-wrap h-8">
      <div className="flex flex-wrap gap-1 items-end font-medium">
        <button
          className={`h-7 text-sm shrink-0 flex gap-1 items-center rounded-2xl pl-2 border 
          ${
            isCatConfirmed
              ? "bg-accent-2 hover:bg-accent-2-hl border-accent-2"
              : "bg-bg hover:bg-gray-light border border-primary"
          } 
          transition-colors duration-150`}
        >
          <div
            className="w-7 h-full"
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
            <div
              className={`size-full flex items-center justify-center stroke-accent-2-darker ${isCatConfirmed ? "hover:stroke-accent-2-darker-hl" : ""}`}
            >
              {isCatConfirmed ? (
                <Image src={crossIcon} alt="cross-icon-tiny"></Image>
              ) : (
                <Image src={plusIcon} alt="plus-icon-tiny"></Image>
              )}
            </div>
          </div>
          <span
            onClick={handleCatButtonClick}
            className="text-nowrap size-full flex items-center"
          >
            <span className="pr-4">{t("Categories")}</span>
          </span>
        </button>
      </div>
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
