'use client'
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import sortIcon from "@/src/assets/sort-icon.svg"

export default function SortBtn({ closeAction, openAction, active }: { closeAction: () => void; openAction: () => void; active: boolean }) {
  return <MobileBtnTemplate onClick={() => {
    if (active) {
      closeAction()
    } else {
      openAction()
    }
  }
  }>
    <div className="flex relative size-full rounded-full">
      <Image
        className="m-auto relative top-[-1px] left-[1px]"
        aria-selected="false"
        src={sortIcon}
        alt="sort-icon"
      ></Image>
    </div>
  </MobileBtnTemplate>
}
