"use client";
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import filterIcon from "@/src/assets/filter-icon.svg";
import { RefObject } from "react";

export default function FilterBtn({
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
        onClick={(e) => {
          if (active) {
            e.stopPropagation();
            closeAction();
          } else {
            openAction();
          }
        }}
      >
        <div className="flex relative size-full rounded-full">
          <Image
            className="m-auto"
            aria-selected="false"
            src={filterIcon}
            alt="sort-icon"
          ></Image>
        </div>
      </MobileBtnTemplate>
    </div>
  );
}
