"use client";

import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

export default function BurgerMenu({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) {
  const t = useTranslations();
  const dialogRef = useRef<null | HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const getPos = () => {
    if (!buttonRef.current) {
      return { left: 0, top: 0, bottom: 0 };
    }
    const result = {
      default: {
        left: buttonRef.current?.getBoundingClientRect().left - 6,
        top: buttonRef.current?.getBoundingClientRect().top + 34,
        bottom: "",
      },
      mobile: {
        left: "calc(50% - 176px)",
        bottom: `${219}px`,
        top: "",
      },
    };
    return result[variant];
  };
  useCloseOnClick([dialogRef, buttonRef], () => setDialogOpen(false), [], true);
  return (
    <div className="group relative flex items-center p-1.5 h-7">
      <div className={`backdrop-modal ${dialogOpen ? "flex" : "hidden!"} `}>
        <div
          ref={dialogRef}
          className={`${dialogOpen ? "block" : "hidden"} absolute`}
          style={{
            left: getPos().left,
            top: getPos().top,
            bottom: getPos().bottom,
          }}
        >
          <div
            className={`fixed flex flex-col bg-bg min-w-40  starting:opacity-0 opacity-100 transition-opacity duration-150`}
            onClick={() => setDialogOpen(false)}
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
        </div>
      </div>

      <button
        ref={buttonRef}
        onClick={() => {
          if (!dialogOpen) {
            setDialogOpen(true);
          } else {
            setDialogOpen(false);
          }
        }}
        className={`space-y-1.25 ${variant === "default" ? "fill-gray-light" : "fill-gray-passive"}`}
      >
        <div
          className={`transition duration-150 ${dialogOpen ? "opacity-0" : "opacity-100"}`}
        >
          {bar}
        </div>
        <div
          className={`transition duration-150 ease-out relative ${dialogOpen ? "-rotate-45" : "rotate-0"}`}
        >
          {bar}
        </div>
        <div
          className={`transition duration-150 ease-out relative ${dialogOpen ? "rotate-45 bottom-[9px]" : "rotate-0 bottom-0"}`}
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
