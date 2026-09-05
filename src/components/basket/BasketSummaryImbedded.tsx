"use client";
import { selectBasketCount, selectTotalCost } from "@/src/state/basketSlice";
import { useAppSelector } from "@/src/state/hooks";
import { useTranslations } from "next-intl";

export default function BasketSummaryEmbedded() {
  const t = useTranslations();
  const basketCount = useAppSelector(selectBasketCount);
  const totalPrice = useAppSelector(selectTotalCost);
  return (
    <div className="mt-10 w-[210px] h-[162px] bg-bg drop-shadow-xl rounded-lg flex flex-col gap-3 p-3">
      {/* DELIVERY LOCATION */}
      <div className="flex gap-2.5">
        {locIcon}
        <span className="text-sm underline">{t("Delivery location")}</span>
      </div>
      <div>
        <span>{t("BasketSummary.items", { count: basketCount })}</span>
        <div className="flex justify-between">
          <span className="text-xl">{t("Total")}</span>
          <span className="text-2xl">{totalPrice}</span>
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
