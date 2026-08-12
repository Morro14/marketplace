"use client";

import Link from "next/link";
import Basket from "./page";

export default function BasketModal() {
  return (
    <div id="basket-modal" className="m-auto absolute bg-gray-400">
      <div className="p-5">
        <Link href="/" className="text-sm underline absolute top-0 right-0">
          {closeButton}
        </Link>
        {Basket()}
      </div>
    </div>
  );
}

const closeButton = (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2px"
  >
    <line
      x1="20.1526"
      y1="20.1526"
      x2="6.71752"
      y2="6.71757"
      stroke="#F1F1F1"
    />
    <line
      x1="6.71749"
      y1="20.1525"
      x2="20.1525"
      y2="6.71749"
      stroke="#F1F1F1"
    />
  </svg>
);
