'use client'
import { useRef } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
import ProductsCatModal from "../products/nav/ProductsCatModal";
import { Category } from "@/src/data/productTypes";
export default function FilterModal({ categories, closeAction, active }: { categories: Category[]; closeAction: () => void; active: boolean }) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  useCloseOnClick([modalRef], closeAction)
  return (active ? <div className="absolute w-screen h-screen">
    <div
      className="fixed right-0 bottom-16 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150 min-w-50"
    ><div ref={modalRef}>
        <ProductsCatModal cats={categories} closeModalAction={() => { }}></ProductsCatModal>
      </div>
    </div>

  </div>
    : "")
}
