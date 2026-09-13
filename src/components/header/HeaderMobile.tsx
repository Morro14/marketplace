"use client";
import { useAppSelector } from "@/src/state/hooks";
import BurgerMenu from "./BurgerMenu";
import { selectBasketCount } from "@/src/state/basketSlice";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import MobileBtnTemplate from "./MobileBtnTemplate";
import cartIcon from "@/src/assets/cart-icon-header.svg";

export default function HeaderMobile() {
  const basketCount = useAppSelector(selectBasketCount);
  const t = useTranslations();
  return (
    <div className="fixed max-sm:flex hidden justify-between items-center bottom-0 w-screen bg-bg z-50 h-14 px-3">
      <BurgerMenu variant="mobile"></BurgerMenu>
      <div className="flex">
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <MobileBtnTemplate>
          <div className="relative flex h-full">
            <div className="absolute -top-3.5 left-[14px] rounded-full h-[20px] w-[20px] text-white bg-accent-red outline-2 outline-white">
              <div className="relative top-px text-center text-sm font-sans font-bold">
                {basketCount && basketCount < 100 ? basketCount : "..."}
              </div>
            </div>
            <Image
              className="m-auto -pl-0.5"
              aria-selected="false"
              src={cartIcon}
              alt="cart-icon"
            ></Image>
          </div>
        </MobileBtnTemplate>
      </div>
    </div>
  );
}
