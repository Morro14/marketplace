"use client";
import countriesOnly from "countrycitystatejson/countries";
import Input from "../form/Input";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useMemo, useRef, useState } from "react";
import { useCloseOnClick } from "@/src/utils/components/closeOnClick";
import Fuse, { FuseResult } from "fuse.js";

export default function CountryInput({ error }: { error?: string }) {
  const countries = countriesOnly.getCountries();
  const t = useTranslations();
  const suggestionsRef = useRef<null | HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [value, setValue] = useState<string | undefined>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useCloseOnClick([suggestionsRef, searchInputRef], () =>
    setShowSuggestions(false),
  );
  const fuse = useMemo(() => {
    return new Fuse(countries, {
      keys: ["name", "shortName", "native"],
      threshold: 0.2,
      location: 0,
      distance: 20,
      ignoreLocation: false,
      includeScore: true,
    });
  }, [countries]);
  const [inputItems, setInputItems] =
    useState<FuseResult<(typeof countries)[number]>[]>();
  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget?.value;
    setValue(value);
    const results = fuse.search(value);
    setInputItems(results);
  };
  return (
    <div>
      <Input
        label={t("Country")}
        error={error}
        attrs={{
          name: "country",
          type: "text",
          placeholder: t("State"),
          value: value,
          onFocus: () => setShowSuggestions(true),
          onChange: handleInputChange,
        }}
        ref={searchInputRef}
      ></Input>
      <div className="relative">
        {inputItems ? (
          <div
            className={`absolute z-20 drop-shadow bg-white flex-col text-nowrap overflow-hidden w-full top-1 left-0 ${showSuggestions ? "flex" : "hidden"} starting:opacity-0 opacity-100 transition-opacity duration-100`}
            ref={suggestionsRef}
          >
            {inputItems.slice(0, 5).map((item, i) => (
              <option
                className="px-2 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-light"
                value={item.item.name}
                key={`products-search-item-${i}`}
                onClick={() => {
                  setValue(item.item.name);
                  setShowSuggestions(false);
                }}
              >
                {`${item.item.name}`}
              </option>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
