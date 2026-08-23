"use client";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useRef, useState } from "react";
import Fuse from "fuse.js";
import type { Product } from "@/src/data/productTypes";
import { useMemo } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductSearch({ products }: { products: Product[] }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [value, setValue] = useState(searchParams.get("name") ?? "");
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name"],
      threshold: 0.5,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [products]);
  const searchItemsInit = fuse.search("");
  const [inputItems, setInputItems] = useState(searchItemsInit);
  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value;
    setValue(value);
    const results = fuse.search(value);
    setInputItems(results);
  };
  const submitSearch = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("name", value.trim());
    } else {
      params.delete("name");
    }
    router.push(`${pathname}?${params.toString()}`);
    setShowSuggestions(false);
  };
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useCloseOnClick([suggestionsRef, searchInputRef], () =>
    setShowSuggestions(false),
  );
  return (
    <form className="relative w-90 h-8" onSubmit={submitSearch}>
      <input
        type="search"
        className="size-full px-4 border border-primary rounded-2xl focus:outline-accent"
        onChange={handleInputChange}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        placeholder={t("search products...")}
        ref={searchInputRef}
        value={value}
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
            onClick={() => {
              setValue(item.item.name);
              router.push(
                `${pathname}?${new URLSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  name: item.item.name,
                }).toString()}`,
              );
              setShowSuggestions(false);
            }}
          >
            {item.item.name}
          </option>
        ))}
      </div>
    </form>
  );
}
