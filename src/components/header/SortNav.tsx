'use client'
import { useState } from "react";
import SortBtn from "./SortBtn";
import SortModal from "./SortModal";

export default function SortNav() {
  const [showModal, setShowModal] = useState(false)
  return <div>
    <SortBtn closeAction={() => setShowModal(false)} openAction={() => setShowModal(true)} active={showModal}>
    </SortBtn>
    <SortModal active={showModal} closeAction={() => setShowModal(false)}>
    </SortModal>
  </div>
}
