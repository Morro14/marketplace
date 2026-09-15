'use client'
import { useState } from "react";
import FilterBtn from "./FilterBtn";
import FilterModal from "./FilterModal";
import { Category } from "@/src/data/productTypes";

export default function FilterNav({ categories }: { categories: Category[] }) {
  const [showModal, setShowModal] = useState(false)
  return <div>
    <FilterBtn closeAction={() => setShowModal(false)} openAction={() => setShowModal(true)} active={showModal}>
    </FilterBtn>
    <FilterModal categories={categories} active={showModal} closeAction={() => setShowModal(false)}>
    </FilterModal>
  </div>
}
