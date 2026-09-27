"use client";
import { useRef, useState } from "react";
import FilterBtn from "./FilterBtn";
import FilterModal from "./FilterModal";
import { Category } from "@/src/data/productTypes";
import { usePathname } from "@/src/i18n/navigations";
import { productNavPathnames } from "./utils";

export default function FilterNav({ categories }: { categories: Category[] }) {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<null | HTMLDivElement>(null);
  return (
    <div
      className={`${productNavPathnames.includes(pathname) ? "block" : "hidden"}`}
    >
      <FilterBtn
        closeAction={() => setShowModal(false)}
        openAction={() => setShowModal(true)}
        active={showModal}
        buttonRef={buttonRef}
      ></FilterBtn>
      <FilterModal
        categories={categories}
        active={showModal}
        closeAction={() => setShowModal(false)}
        buttonRef={buttonRef}
      ></FilterModal>
    </div>
  );
}
