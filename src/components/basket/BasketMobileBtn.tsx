"use client";
import { useAppSelector } from "@/src/state/hooks";
import MobileBtnTemplate from "../header/MobileBtnTemplate";
import { selectBasketCount } from "@/src/state/basketSlice";
import Image from "next/image";
import cartIcon from "@/src/assets/cart-icon-header.svg";

export default function BasketMobileBtn() {
  const basketCount = useAppSelector(selectBasketCount);
  return (
    <MobileBtnTemplate>
      <div className="relative flex h-full">
        <div className="absolute z-11 -top-3.5 left-[14px] rounded-full h-[20px] w-[20px] text-white bg-accent-red outline-2 outline-white">
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
  );
}
