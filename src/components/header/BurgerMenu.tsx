"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

export default function BurgerMenu() {
  const t = useTranslations();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  let dialogOpen = false;
  return (
    <div className="group flex items-center p-1.5 h-7">
      <dialog className="" id="menu-modal" closedby="any" ref={dialogRef}>
        <div
          className="fixed right-0 top-20 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150"
          onClick={() => dialogRef.current?.close()}
        >
          <Link href={``} className="p-2 border-b border-gray-line">
            {t("Link 1")}
          </Link>
          <Link href={``} className="p-2 border-b border-gray-line">
            {t("Link 2")}
          </Link>
          <Link href={``} className="p-2 border-b border-gray-line">
            {t("Link 3")}
          </Link>
          <Link href={``} className="p-2 border-b border-gray-line">
            {t("Link 4")}
          </Link>
        </div>
        {/* <p>123</p> */}
      </dialog>

      <button
        onClick={() => {
          // const dialogOpen = params.dialogRef.current.open;
          if (dialogOpen) {
            dialogRef.current?.close();
            dialogOpen = false;
          } else {
            dialogRef.current?.showModal();
            dialogOpen = true;
          }
          // console.log("dialogOpen", dialogOpen);
          // params.setModalShow(!dialogOpen);
        }}
        className="space-y-1.25"
      >
        <div
          className={`transition duration-150 group-has-open:opacity-0 opacity-100`}
        >
          {bar}
        </div>
        <div
          className={`transition duration-150 ease-out relative group-has-open:-rotate-45 rotate-0`}
        >
          {bar}
        </div>
        <div
          className={`transition duration-150 ease-out relative group-has-open:rotate-45 rotate-0 group-has-open:bottom-[9px] bottom-0`}
        >
          {bar}
        </div>
      </button>
    </div>
  );
}
const bar = (
  <svg
    width="22"
    height="3"
    viewBox="0 0 22 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="22" height="3" className="fill-gray-light" />
  </svg>
);
