"use client";
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
    <div className="sm:block hidden">
      <button
        onClick={handleClick}
        className="btn__accent flex items-center gap-2 lg:px-5 max-lg:w-8 bg-accent h-8 rounded-lg group"
      >
        <div
          className={`${catalogOpen ? "rotate-90" : "rotate-0"} transition-transform duration-150 ease-out max-lg:mx-auto`}
        >
          {catalogBtnIcon}
        </div>
        <span className="font-medium max-lg:hidden block">{t("Catalog")}</span>
      </button>
      <CatalogSide
        onCloseAction={() => setCatalogOpen(false)}
        ref={catalogSideRef}
        categories={categories}
      ></CatalogSide>
    </div>
  );
}
const catalogBtnIcon = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-primary"
  >
    <rect width="7.08333" height="7.08333" rx="2" />
    <rect y="9.91667" width="7.08333" height="7.08333" rx="2" />
    <rect x="9.20825" y="9.91667" width="7.08333" height="7.08333" rx="2" />
    <rect x="9.20825" width="7.08333" height="7.08333" rx="2" />
  </svg>
);
