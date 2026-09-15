'use client'
import { useRef } from "react";
import Image from "next/image";
import filterIcon from "@/src/assets/filter-icon.svg"
import MobileBtnTemplate from "../../header/MobileBtnTemplate";
import ProductsCatModal from "./ProductsCatModal";
import { Category } from "@/src/data/productTypes";

export default function FilterModal({ categories }: { categories: Category[] }) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  let dialogOpen = false;
  return <div className="">
    <dialog
      className=""
      id="filter-modal"
      closedby="any"
      ref={dialogRef}
    >
      <div
        className="fixed right-0 bottom-16 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150 min-w-50"
      >
        <ProductsCatModal cats={categories} closeModalAction={() => { }}></ProductsCatModal>
      </div>

    </dialog>
    <MobileBtnTemplate onClick={() => {
      if (dialogOpen) {
        dialogRef.current?.close();
        dialogOpen = false;
      } else {
        dialogRef.current?.showModal();
        dialogOpen = true;
      }
    }
    }>
      <div className="flex relative size-full rounded-full">
        <Image
          className="m-auto"
          aria-selected="false"
          src={filterIcon}
          alt="sort-icon"
        ></Image>
      </div>
    </MobileBtnTemplate>
  </div>
}
