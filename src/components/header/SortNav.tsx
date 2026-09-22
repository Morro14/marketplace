"use client";
import { useState } from "react";
import SortBtn from "./SortBtn";
import SortModal from "./SortModal";
import { usePathname } from "@/src/i18n/navigations";
import { productNavPathnames } from "./utils";

export default function SortNav() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  return (
    <div
      className={`${productNavPathnames.includes(pathname) ? "block" : "hidden"}`}
    >
      <SortBtn
        closeAction={() => setShowModal(false)}
        openAction={() => setShowModal(true)}
        active={showModal}
      ></SortBtn>
      <SortModal
        active={showModal}
        closeAction={() => setShowModal(false)}
      ></SortModal>
    </div>
  );
}
