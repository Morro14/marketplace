"use client";
import { useRef } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
import ProductsCatModal from "../products/nav/ProductsCatModal";
import { Category } from "@/src/data/productTypes";
export default function FilterModal({
  categories,
  closeAction,
  active,
}: {
  categories: Category[];
  closeAction: () => void;
  active: boolean;
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseOnClick([modalRef], closeAction, [], false);
  return active ? (
    <div className="backdrop-modal">
      <div className="absolute max-sm:right-0 max-sm:bottom-14 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150 md:m-auto">
        <div ref={modalRef}>
          <ProductsCatModal
            cats={categories}
            closeModalAction={() => {}}
          ></ProductsCatModal>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
