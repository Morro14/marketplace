"use client";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";
import Chip from "./Chip";

export default function ProductsCatModal({
  cats,
  confirmedCats,
  setConfirmedCatsAction,
  closeModalAction,
}: {
  cats: string[];
  confirmedCats: string[];
  setConfirmedCatsAction: Dispatch<SetStateAction<string[]>>;
  closeModalAction: () => void;
}) {
  const t = useTranslations();
  const [selectedCats, setSelectedCats] = useState<string[]>(confirmedCats);
  const nonSelectedCats = cats.filter((cat) => !selectedCats.includes(cat));
  const addCat = (cat: string) => {
    setSelectedCats([...selectedCats, cat]);
  };
  const removeCat = (catRemove: string) => {
    setSelectedCats(selectedCats.filter((cat) => cat !== catRemove));
  };
  const confirm = () => {
    setConfirmedCatsAction(selectedCats);
    closeModalAction();
  };
  return (
    <div className="products-cats-modal drop-shadow-lg bg-bg flex flex-col gap-13 p-12">
      {/* responsive */}
      <h4 className="font-serif text-2xl text-primary">
        {t("Select categories to filter products")}
      </h4>
      <div className="flex flex-col gap-3 h-45">
        <div className="flex flex-wrap gap-2">
          {selectedCats.length === 0 ? (
            <span className="text-gray-400 italic">
              {t("Show products from all categories")}
            </span>
          ) : (
            selectedCats.map((cat, i) => (
              <Chip
                key={`product-cat-modal-chip-${i}`}
                variant={{ bg: "accent", shape: "rounded", icon: "cross" }}
                label={cat}
                attrs={{ onClick: () => removeCat(cat) }}
              ></Chip>
            ))
          )}
        </div>
        <div className="w-full h-px bg-gray-300"></div>
        <div className="flex flex-wrap gap-2">
          {nonSelectedCats.map((cat, i) => (
            <Chip
              key={`product-cat-modal-chip-${i}`}
              variant={{ bg: "gray", shape: "rounded", icon: "plus" }}
              label={cat}
              attrs={{ onClick: () => addCat(cat) }}
            ></Chip>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={confirm}
          className="bg-accent px-6 border border-primary h-8"
        >
          {t("Apply")}
        </button>
        <button
          onClick={closeModalAction}
          className="bg-gray-light px-6 border border-primary h-8"
        >
          {t("Cancel")}
        </button>
      </div>
    </div>
  );
}
