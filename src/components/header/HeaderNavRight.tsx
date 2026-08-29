"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import loginIcon from "@/src/assets/login-icon.svg";
import basketIcon from "@/src/assets/cart-icon-header.svg";
import { useAppSelector } from "@/src/state/hooks";
import { selectBasketCount } from "@/src/state/basketSlice";
import Link from "next/link";

export default function HeaderNavRight() {
  const t = useTranslations();
  const basketCountSelector = useAppSelector(selectBasketCount);
  return (
    <div className="flex gap-4 relative top-[14px]">
      <button
        className="flex items-center gap-3 bg-gray-light hover:bg-white
        transition-color duration-150 h-8 rounded-2xl font-serif font-semibold
        px-3 border-b-3 border-primary hover:border-gray-500"
      >
        <span className="mt-0.5">{t("login")}</span>
        <Image src={loginIcon} alt="login-icon"></Image>
      </button>
      <button
        className="flex items-center gap-3 bg-gray-light hover:bg-white
        transition-color duration-150 h-8 rounded-2xl font-serif font-semibold
        px-3 border-b-3 border-primary hover:border-gray-500"
      >
        <div className="rounded-full h-[18px] w-[18px] text-white bg-accent-red">
          <div className="relative top-0.5 text-xs font-sans font-semibold">
            {basketCountSelector}
          </div>
        </div>
        <Link href={"/basket"} className="flex gap-1">
          <span className="mt-0.5">{t("basket")}</span>
          <Image
            className=""
            aria-selected="false"
            src={basketIcon}
            alt="login-icon"
          ></Image>
        </Link>
      </button>
    </div>
  );
}
