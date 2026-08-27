"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import loginIcon from "@/src/assets/login-icon.svg";
import basketIcon from "@/src/assets/basket-icon-40x40.png";
import { useAppSelector } from "@/src/state/hooks";
import { selectBasketCount } from "@/src/state/basketSlice";

export default function HeaderNavRight() {
  const t = useTranslations();
  const basketCountSelector = useAppSelector(selectBasketCount);
  return (
    <div className="flex gap-4 relative top-[14px]">
      <button className="flex items-center gap-5 bg-[#eee] h-8 rounded-2xl font-serif font-bold px-3 border-b-3 border-primary">
        <span className="mt-0.5">{t("login")}</span>
        <Image src={loginIcon} alt="login-icon"></Image>
      </button>
      <button className="flex items-center gap-5 bg-[#eee] h-8 rounded-2xl font-serif font-bold px-3 border-b-3 border-primary">
        <div className="flex items-center gap-2">
          <div className="rounded-full h-[18px] w-[18px] text-white bg-accent-red">
            <div className="relative top-0.5 text-xs font-sans font-semibold">
              {basketCountSelector}
            </div>
          </div>
          <span className="mt-0.5">{t("basket")}</span>
        </div>
        <Image
          className="relative -top-[3px] -right-2 "
          aria-selected="false"
          src={basketIcon}
          alt="login-icon"
        ></Image>
      </button>
    </div>
  );
}
