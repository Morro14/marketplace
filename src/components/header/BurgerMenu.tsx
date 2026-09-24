"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

export default function BurgerMenu({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) {
  const t = useTranslations();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const getPos = () => {
    if (!buttonRef.current) {
      return { x: 0, y: 0 };
    }
    const result = {
      default: {
        x: buttonRef.current?.getBoundingClientRect().x - 6,
        y: buttonRef.current?.getBoundingClientRect().y + 34,
      },
      mobile: {
        x: buttonRef.current?.getBoundingClientRect().x,
        y: buttonRef.current?.getBoundingClientRect().y + 34,
      },
    };
    return result[variant];
  };
  return (
    <div className="group relative flex items-center p-1.5 h-7">
      <dialog
        className=""
        id="menu-modal"
        closedby="any"
        ref={dialogRef}
        onClose={() => setDialogOpen(false)}
      >
        <div
          className={`fixed flex flex-col bg-bg min-w-40  starting:opacity-0 opacity-100 transition-opacity duration-150`}
          style={{ left: getPos().x, top: getPos().y }}
          onClick={() => {
            setDialogOpen(false);
            dialogRef.current?.close();
          }}
        >
          <Link
            href="/"
            className="p-2 border-b border-gray-300 hover:bg-gray-light"
          >
            {t("Home")}
          </Link>
          <Link
            href={``}
            className="p-2 border-b border-gray-300 hover:bg-gray-light"
          >
            {t("Link 2")}
          </Link>
          <Link
            href={``}
            className="p-2 border-b border-gray-300 hover:bg-gray-light"
          >
            {t("Link 3")}
          </Link>
          <Link href={``} className="p-2 hover:bg-gray-light">
            {t("Link 4")}
          </Link>
        </div>
        {/* <p>123</p> */}
      </dialog>

      <button
        ref={buttonRef}
        onClick={() => {
          // const dialogOpen = params.dialogRef.current.open;
          if (!dialogOpen && !dialogRef.current?.open) {
            setDialogOpen(true);
            dialogRef.current?.showModal();
          } else {
            setDialogOpen(false);
          }

          // console.log("dialogOpen", dialogOpen);
          // params.setModalShow(!dialogOpen);
        }}
        className={`space-y-1.25 ${variant === "default" ? "fill-gray-light" : "fill-gray-passive"}`}
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
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="22" height="3" />
  </svg>
);
