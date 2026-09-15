'use client'
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import filterIcon from "@/src/assets/filter-icon.svg"

export default function FilterBtn({ closeAction, openAction, active }: { closeAction: () => void; openAction: () => void; active: boolean }) {
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
        className="m-auto"
        aria-selected="false"
        src={filterIcon}
        alt="sort-icon"
      ></Image>
    </div>
  </MobileBtnTemplate>

}
