"use client";
import Image from "next/image";
import catalogBtnIcon from "@/src/assets/catalog-btn-icon.svg";
import { useTranslations } from "next-intl";

export default function CatalogBtn() {
  const t = useTranslations();
  return (
    <button className="flex items-center gap-1 px-5 bg-accent h-8 border border-primary">
      <Image src={catalogBtnIcon} alt="catalog-btn-icon"></Image>
      <span>{t("Catalog")}</span>
    </button>
  );
}
