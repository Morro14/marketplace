"use client";
import { useRef, useState } from "react";
import SortBtn from "./SortBtn";
import SortModal from "./SortModal";
import { usePathname } from "@/src/i18n/navigations";
import { productNavPathnames } from "./utils";

export default function SortNav() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<null | HTMLDivElement>(null);
  return (
    <div
      className={`${productNavPathnames.includes(pathname) ? "block" : "hidden"}`}
    >
      <SortBtn
        closeAction={() => setShowModal(false)}
        openAction={() => setShowModal(true)}
        active={showModal}
        buttonRef={buttonRef}
      ></SortBtn>
      <SortModal
        active={showModal}
        closeAction={() => setShowModal(false)}
        buttonRef={buttonRef}
      ></SortModal>
    </div>
  );
}
