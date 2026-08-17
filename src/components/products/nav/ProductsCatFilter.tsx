"use client";

import { useRef, useState } from "react";
import { categories as categoriesData } from "@/src/data/products";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  setCategoriesSelected,
  setCategoriesConfirmed,
  selectCategoriesConfirmed,
} from "@/src/state/productsSlice";
import plusIcon from "@/src/assets/plus-icon-tiny.svg";
import crossIcon from "@/src/assets/cross-icon-tiny.svg";
import Image from "next/image";
import ProductsCatModal from "./ProductsCatModal";

export default function ProductsCarFilter() {
  const t = useTranslations();
  const categories = Array.from(categoriesData);
  // const [confirmedCats, setConfirmedCats] = useState<string[]>([]);
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
  const catsConfirmed = useAppSelector(selectCategoriesConfirmed);
  const dispatch = useAppDispatch();
  const isCatConfirmed = catsConfirmed.length > 0;
  return (
    <div className="flex flex-wrap h-8">
      <div className="flex flex-wrap gap-1 items-end font-medium">
        <button
          className={`h-7 text-sm shrink-0 flex gap-1 items-center rounded-2xl pl-2 border 
          ${
            isCatConfirmed
              ? "bg-accent-2 hover:bg-accent-2-hl border-accent-2"
              : "bg-bg hover:bg-accent-2-hl border border-primary"
          } 
          transition-colors duration-150`}
        >
          <div
            className="w-7 h-full"
            onClick={
              isCatConfirmed
                ? () => {
                    dispatch(setCategoriesConfirmed([]));
                    dispatch(setCategoriesSelected([]));
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

// const chipSelected = (
//   <Chip
//     key={`category-chip-${i}`}
//     variant={{ bg: "accent", shape: "rounded", icon: "none" }}
//     label={t(cat)}
//     attrs={{ onClick: handleCatButtonClick }}
//   ></Chip>
// );
const cross = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="3.53548"
      y1="3.53553"
      x2="10.6065"
      y2="10.6066"
      stroke-width="2"
    />
    <line
      x1="3.53557"
      y1="10.6066"
      x2="10.6066"
      y2="3.53554"
      stroke-width="2"
    />
  </svg>
);
