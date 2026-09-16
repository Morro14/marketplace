"use client";
import { SORT_BY } from "@/src/utils/appVars";
import { useTranslations } from "next-intl";
import { ProductSort } from "@/src/data/productQueries";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
export default function SortModal({
  closeAction,
  active,
}: {
  closeAction: () => void;
  active: boolean;
}) {
  const t = useTranslations("SortModal");
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useCloseOnClick([modalRef], closeAction, [], false);
  const handleNav = (e: any, sortBy: ProductSort) => {
    if (!modalRef.current) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    params.delete("sortBy");
    params.append("sortBy", sortBy);
    closeAction();
    router.replace(`/products?${params.toString()}`);
  };
  return active ? (
    <div className="backdrop-modal">
      <div
        ref={modalRef}
        className="fixed right-0 bottom-14 flex flex-col bg-bg starting:opacity-0 opacity-100 transition-opacity duration-150 min-w-50 p-2"
      >
        <h4 className="font-serif 2xl:text-2xl text-lg text-primary my-2">
          {t("Sort by")}
        </h4>
        {SORT_BY.toSorted().map((sort, i) => (
          <div
            className={`w-full flex justify-between items-center py-2 ${i < SORT_BY.length - 1 ? "border-b border-gray-light" : ""}`}
            key={i}
            onClick={(e) => handleNav(e, sort)}
          >
            <div className={`flex my-auto `}>{t(sort)}</div>
            <div className="text-xl">{/(Desc)/.test(sort) ? "↓" : "↑"}</div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    ""
  );
}
