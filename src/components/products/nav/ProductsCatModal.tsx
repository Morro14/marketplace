"use client";
import { useTranslations } from "next-intl";
import Chip from "./Chip";
import { useAppDispatch, useAppSelector } from "@/src/state/hooks";
import {
  setCategoriesSelected,
  setCategoriesConfirmed,
  // selectCategoriesConfirmed,
  selectCategoriesSelected,
} from "@/src/state/productsSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductsCatModal({
  cats,
  // confirmedCats,
  // setConfirmedCatsAction,
  closeModalAction,
}: {
  cats: string[];
  // confirmedCats: string[];
  // setConfirmedCatsAction: Dispatch<SetStateAction<string[]>>;
  closeModalAction: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [selectedCats, setSelectedCats] = useState<string[]>(confirmedCats);
  const dispatch = useAppDispatch();
  // const catsConfirmed = useAppSelector(selectCategoriesConfirmed);
  const catsSelected = useAppSelector(selectCategoriesSelected);
  const nonSelectedCats = cats.filter((cat) => !catsSelected.includes(cat));
  const addCat = (cat: string) => {
    dispatch(setCategoriesSelected([...catsSelected, cat]));
  };
  const removeCat = (catRemove: string) => {
    dispatch(
      setCategoriesSelected(catsSelected.filter((cat) => cat !== catRemove)),
    );
  };
  const confirm = () => {
    dispatch(setCategoriesConfirmed(catsSelected));
    const params = new URLSearchParams(searchParams.toString());
    if (catsSelected.length > 0) {
      params.set("filter", catsSelected.join(","));
    } else {
      params.delete("filter");
    }
    router.push(`${pathname}?${params.toString()}`);
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
          {catsSelected.length === 0 ? (
            <span className="text-gray-400 italic">
              {t("Show products from all categories")}
            </span>
          ) : (
            catsSelected.map((cat, i) => (
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
