"use client";
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import sortIcon from "@/src/assets/sort-icon.svg";
import { RefObject } from "react";

export default function SortBtn({
  closeAction,
  openAction,
  active,
  buttonRef,
}: {
  closeAction: () => void;
  openAction: () => void;
  active: boolean;
  buttonRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={buttonRef}>
      <MobileBtnTemplate
        onClick={() => {
          if (active) {
            closeAction();
          } else {
            openAction();
          }
        }}
      >
        <div className="flex relative size-full rounded-full">
          <Image
            className="m-auto relative top-[-1px] left-[1px]"
            aria-selected="false"
            src={sortIcon}
            alt="sort-icon"
          ></Image>
        </div>
      </MobileBtnTemplate>
    </div>
  );
}
