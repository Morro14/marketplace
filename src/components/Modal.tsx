'use client'
import { ReactNode, RefObject } from "react";
export default function Modal({ children, modalRef, active }: { children: ReactNode; modalRef: RefObject<HTMLDivElement>; active: boolean }) {
  return <div
    className=""
    id="menu-modal"
    ref={modalRef}
  >{children}</div>
}
