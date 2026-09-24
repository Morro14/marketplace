"use client";
import { selectBasketCount, selectTotalCost } from "@/src/state/basketSlice";
import { useAppSelector } from "@/src/state/hooks";
import { CURRENCY, CURRENCY_SIGNS } from "@/src/utils/appVars";
import { useTranslations } from "next-intl";
import { formatCost } from "@/src/utils/basketUtils";
import Link from "next/link";

export default function BasketSummaryEmbedded() {
  const t = useTranslations();
  const basketCount = useAppSelector(selectBasketCount);
  const totalPrice = formatCost(useAppSelector(selectTotalCost));
  const CURRENCY_SIGN = CURRENCY_SIGNS[CURRENCY];
  return (
    <div className="basket-summary justify-center flex max-lg:w-screen bg-bg lg:rounded-lg ">
      {/* DELIVERY LOCATION */}
      <div className="sm:w-[556px] w-[352px] lg:w-[230px] flex sm:justify-start justify-center">
        <div className="max-lg:w-[352px] lg:m-auto flex flex-col gap-2">
          <div className="link flex gap-2.5">
            {locIcon}
            <Link href="/add-address" className="text-sm underline">
              {t("Delivery location")}
            </Link>
          </div>
          <div className="px-1 lg:block hidden">
            <span>{t("items", { count: basketCount })}</span>
            <div className="flex justify-between pr-1">
              <span className="text-xl">{t("Total")}</span>
              <div className="flex gap-1">
                <span className="text-2xl">{CURRENCY_SIGN}</span>
                <span className="text-2xl text-left w-25">{totalPrice}</span>
              </div>
            </div>
          </div>
          <Link href={"/checkout"}>
            <button className="btn__accent lg:block hidden h-8 rounded-lg font-medium w-50">
              {t("Proceed to checkout")}
            </button>
            <button className="btn__accent lg:hidden flex items-center justify-between h-9 rounded-lg px-2 font-medium w-full">
              <div>
                <span>{t("Proceed to checkout")} | </span>
                <span className="text-sm text-gray-passive">
                  {t("items", { count: basketCount })}
                </span>
              </div>
              <div className="flex gap-1">
                <span className="">{CURRENCY_SIGN}</span>
                <span className="">{totalPrice}</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
const locIcon = (
  <svg
    width="12"
    height="19"
    viewBox="0 0 12 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.74707 0C8.92112 0 11.4941 2.57302 11.4941 5.74707C11.4941 8.55639 9.18953 12.4078 6.74707 17.8145C6.3821 18.6223 5.20392 18.6224 4.83691 17.8154C2.3777 12.4082 8.72326e-05 8.5566 0 5.74707C0 2.57304 2.57305 2.98799e-05 5.74707 0ZM5.75 3.12598C4.35345 3.12598 3.22075 4.25776 3.2207 5.6543C3.2207 7.05088 4.35342 8.18359 5.75 8.18359C7.14647 8.18347 8.27832 7.0508 8.27832 5.6543C8.27827 4.25783 7.14644 3.1261 5.75 3.12598Z"
      fill="#3E3E3E"
    />
  </svg>
);
