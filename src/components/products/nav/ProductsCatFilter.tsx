"use client";

import { useRef, useState } from "react";
import { categories as categoriesData } from "@/src/data/products";
import { useTranslations } from "next-intl";
import plusIcon from "@/src/assets/plus-icon-tiny.svg";
import Image from "next/image";
import Chip from "./Chip";
import ProductsCatModal from "./ProductsCatModal";

export default function ProductsCarFilter() {
  const t = useTranslations();
  const categories = Array.from(categoriesData);
  const [confirmedCats, setConfirmedCats] = useState<string[]>([]);
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
  return (
    <div className="flex gap-1 h-8">
      <div className="flex gap-1">
        {confirmedCats.length === 0 ? (
          <div className="h-8 border border-gray-400 rounded-full text-gray-400 flex items-center px-2">
            {t("All categories")}
          </div>
        ) : (
          confirmedCats.map((cat, i) => (
            <Chip
              key={`category-chip-${i}`}
              variant={{ bg: "accent", shape: "rounded", icon: "cross" }}
              label={t(cat)}
            ></Chip>
          ))
        )}
      </div>
      <button
        onClick={handleCatButtonClick}
        className="h-8 flex gap-3 items-center border border-primary rounded-2xl pr-4 pl-2"
      >
        <Image src={plusIcon} alt="plus-icon-tiny"></Image>
        <span>{t("Select category")}</span>
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
          confirmedCats={confirmedCats}
          setConfirmedCatsAction={setConfirmedCats}
          closeModalAction={closeModal}
        ></ProductsCatModal>
      </dialog>
    </div>
  );
}
