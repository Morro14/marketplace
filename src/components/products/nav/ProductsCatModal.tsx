"use client";
import { useTranslations } from "next-intl";
import Chip from "./Chip";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  setCategoriesSelected,
  setCategoriesConfirmed,
  selectCategoriesSelected,
} from "@/src/state/productsSlice";
import { useRouter } from "next/navigation";
import { Category } from "@/src/data/productTypes";

export default function ProductsCatModal({
  cats,
  closeModalAction,
}: {
  cats: Category[];
  closeModalAction: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const catsSelected = useAppSelector(selectCategoriesSelected);
  const nonSelectedCats = cats.filter(
    (cat) => !catsSelected.find((cat_) => cat.id === cat_.id),
  );
  const addCat = (catSlug: string) => {
    const cat = cats.find((cat_) => cat_.slug === catSlug);
    if (cat) {
      dispatch(setCategoriesSelected([...catsSelected, cat]));
    }
  };
  const removeCat = (catSlug: string) => {
    dispatch(
      setCategoriesSelected(catsSelected.filter((cat) => catSlug !== cat.slug)),
    );
  };
  const confirm = () => {
    dispatch(setCategoriesConfirmed(catsSelected));
    const params = new URLSearchParams();
    catsSelected.forEach((cat) => {
      params.append("cat", cat.slug);
    });
    closeModalAction();
    router.replace(`/products?${params.toString()}`);
  };
  return (
    <div className="products-cats-modal sm:drop-shadow-lg bg-bg flex flex-col ">
      {/* responsive */}
      <h4 className="font-serif 2xl:text-2xl text-lg text-primary max-sm:text-right">
        {t("Select categories to filter products")}
      </h4>
      <div className="flex flex-col gap-4 2xl:h-45">
        <div className="flex flex-wrap gap-2 max-sm:justify-end">
          {catsSelected.length === 0 ? (
            <span className="text-gray-400 italic">
              {t("Show products from all categories")}
            </span>
          ) : (
            catsSelected.map((cat, i) => (
              <Chip
                key={`product-cat-modal-chip-${i}`}
                variant={{ bg: "accent", shape: "rounded", icon: "cross" }}
                label={cat.name}
                attrs={{ onClick: () => removeCat(cat.slug) }}
              ></Chip>
            ))
          )}
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="flex flex-wrap gap-2 max-sm:justify-end">
          {nonSelectedCats.map((cat, i) => (
            <Chip
              key={`product-cat-modal-chip-${i}`}
              variant={{ bg: "gray", shape: "rounded", icon: "plus" }}
              label={cat.name}
              attrs={{ onClick: () => addCat(cat.slug) }}
            ></Chip>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-gray-300"></div>
      <div className="flex gap-2 mt-0 max-sm:justify-end">
        <button onClick={confirm} className="btn__accent px-6 rounded-lg h-7">
          {t("Apply")}
        </button>
        <button
          onClick={closeModalAction}
          className="btn__secondary rounded-lg px-6 h-7"
        >
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
}
