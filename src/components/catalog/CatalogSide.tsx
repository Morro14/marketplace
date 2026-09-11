"use client";
import { Category } from "@/src/data/productTypes";
import { useAppDispatch } from "@/src/state/hooks";
import { setCategoriesConfirmed } from "@/src/state/productsSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefObject } from "react";

export default function CatalogSide({
  ref,
  onCloseAction,
  categories,
}: {
  ref: RefObject<HTMLDialogElement | null>;
  onCloseAction: () => void;
  categories: Category[];
}) {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleCatNavigate = (cat: Category) => {
    dispatch(setCategoriesConfirmed([cat]));
    const params = new URLSearchParams();
    params.append("cat", cat.slug);
    onCloseAction();
    router.replace(`/products?${params.toString()}`);
  };
  return (
    <dialog
      className=""
      id="menu-modal"
      closedby="any"
      ref={ref}
      onClose={onCloseAction}
    >
      <div
        className="fixed p-4 starting:translate-x-[-332px] translate-x-0 left-0 top-[43px] h-screen w-[332px] flex flex-col bg-bg starting:opacity-0 opacity-100 transition-translate duration-150 ease-out gap-3"
        onClick={() => ref.current?.close()}
      >
        <h3 className="font-serif text-xl">{t("Catalog")}</h3>
        <div className="h-px w-full bg-gray-300"></div>
        <div className="flex flex-col text-lg ">
          {categories
            ? categories.map((cat, i) => (
                <Link
                  className="hover:bg-gray-light"
                  onNavigate={() => handleCatNavigate(cat)}
                  href={`/products?cat=${cat.slug}`}
                  key={i}
                >
                  {cat.name}
                </Link>
              ))
            : ""}
        </div>
      </div>
    </dialog>
  );
}
