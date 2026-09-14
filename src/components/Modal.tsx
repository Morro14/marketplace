'use client'
import { useRef } from "react";
export default function Modal() {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  let dialogOpen = false;
  return <div>
    <dialog
      className=""
      id="menu-modal"
      closedby="any"
      ref={dialogRef}
      onClose={() => (dialogOpen = false)}
    ></dialog>
  </div>
}
