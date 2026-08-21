"use client";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useRef, useState } from "react";
import Fuse from "fuse.js";
import { products } from "@/src/data/products";
import { useMemo } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";

export default function ProductSearch() {
  const t = useTranslations();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name"],
      threshold: 0.5,
      ignoreLocation: true,
      includeScore: true,
    });
  }, []);
  const searchItemsInit = fuse.search("");
  const [inputItems, setInputItems] = useState(searchItemsInit);
  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value;
    const results = fuse.search(value);
    setInputItems(results);
  };
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useCloseOnClick([suggestionsRef, searchInputRef], () =>
    setShowSuggestions(false),
  );
  return (
    <div className="relative w-90 h-8">
      <input
        type="search"
        className="size-full px-4 border border-primary rounded-2xl focus:outline-accent"
        onChange={handleInputChange}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        placeholder={t("search products...")}
        ref={searchInputRef}
      />
      <div
        className={`absolute z-20 drop-shadow bg-white flex-col text-nowrap overflow-hidden w-full top-9 left-0 ${showSuggestions ? "flex" : "hidden"} starting:opacity-0 opacity-100 transition-opacity duration-100`}
        ref={suggestionsRef}
      >
        {inputItems.slice(0, 5).map((item, i) => (
          <option
            className="px-2 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-light"
            value={item.item.name}
            key={`products-search-item-${i}`}
            onClick={() =>
              console.log(`redirect to /products/${item.refIndex}`)
            }
          >
            {item.item.name}
          </option>
        ))}
      </div>
    </div>
  );
}
