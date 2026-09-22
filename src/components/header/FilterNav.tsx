"use client";
import { useState } from "react";
import FilterBtn from "./FilterBtn";
import FilterModal from "./FilterModal";
import { Category } from "@/src/data/productTypes";
import { usePathname } from "@/src/i18n/navigations";
import { productNavPathnames } from "./utils";

export default function FilterNav({ categories }: { categories: Category[] }) {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  return (
    <div
      className={`${productNavPathnames.includes(pathname) ? "block" : "hidden"}`}
    >
      <FilterBtn
        closeAction={() => setShowModal(false)}
        openAction={() => setShowModal(true)}
        active={showModal}
      ></FilterBtn>
      <FilterModal
        categories={categories}
        active={showModal}
        closeAction={() => setShowModal(false)}
      ></FilterModal>
    </div>
  );
}
