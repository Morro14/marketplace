'use client'
import { useRef } from "react";
import { SORT_BY } from "@/src/utils/appVars"
import { ProductSort } from "@/src/data/productQueries";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import sortIcon from "@/src/assets/sort-icon.svg"
import MobileBtnTemplate from "../../header/MobileBtnTemplate";
import { useTranslations } from "next-intl";

export default function SortModal() {
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  let dialogOpen = false;
  const t = useTranslations("SortModal")
  const searchParams = useSearchParams()
  const router = useRouter()
  const handleNav = (e: any, sortBy: ProductSort) => {
    if (!dialogRef.current) {
      return
    }
    const params = new URLSearchParams(searchParams)
    params.delete("sortBy")
    params.append("sortBy", sortBy)
    dialogOpen = false
    dialogRef.current.close()
    router.replace(`/products?${params.toString()}`)
  }
  return <div className="">
    <dialog
      className=""
      id="sort-modal"
      closedby="any"
      ref={dialogRef}
    >
      <div
        className="fixed right-0 bottom-16 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150 min-w-50"
      >
        {SORT_BY.toSorted().map((sort, i) =>
          <div className={`w-full flex justify-between items-center py-2 px-2 ${i < SORT_BY.length - 1 ? "border-b border-gray-light" : ""}`} key={i} onClick={(e) => handleNav(e, sort)}>
            <div className={`flex my-auto `}>{t(sort)}</div>
            <div className="text-xl">{/(Desc)/.test(sort) ? "↓" : "↑"}</div>
          </div>
        )

        }
      </div>

    </dialog>
    <MobileBtnTemplate onClick={() => {
      if (dialogOpen) {
        dialogRef.current?.close();
        dialogOpen = false;
      } else {
        dialogRef.current?.showModal();
        dialogOpen = true;
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
  </div>
}
