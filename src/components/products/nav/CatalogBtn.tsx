"use client";
import Image from "next/image";
import catalogBtnIcon from "@/src/assets/catalog-btn-icon.svg";
import { useTranslations } from "next-intl";
import CatalogSide from "../../catalog/CatalogSide";
import { useRef, useState } from "react";
import { Category } from "@/src/data/productTypes";

export default function CatalogBtn({ categories }: { categories: Category[] }) {
  const t = useTranslations();
  const catalogSideRef = useRef<null | HTMLDialogElement>(null);
  // let catalogOpen = false;
  const [catalogOpen, setCatalogOpen] = useState(false);
  const handleClick = () => {
    if (!catalogSideRef.current) {
      return;
    }
    if (catalogOpen) {
      setCatalogOpen(false);
      catalogSideRef.current?.close();
    } else {
      setCatalogOpen(true);
      catalogSideRef.current?.close();
      catalogSideRef.current?.showModal();
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="btn__accent flex items-center gap-2 px-5 bg-accent h-8 rounded-lg group border-b-2 border-primary"
      >
        <Image
          src={catalogBtnIcon}
          alt="catalog-btn-icon"
          className={`${catalogOpen ? "rotate-90" : "rotate-0"} transition-transform duration-150 ease-out`}
        ></Image>
        <span className="font-medium">{t("Catalog")}</span>
      </button>
      <CatalogSide
        onCloseAction={() => setCatalogOpen(false)}
        ref={catalogSideRef}
        categories={categories}
      ></CatalogSide>
    </div>
  );
}
