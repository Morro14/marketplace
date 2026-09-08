import { getBasketCheckoutSummary } from "@/src/data/basketQueries";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import CheckoutSummaryEntryList from "./CheckoutSummaryEntryList";
import { formatCost } from "@/src/utils/basketUtils";
import { CURRENCY_SIGN } from "@/src/utils/appVars";

export default async function CheckoutSummary({
  addressInfo,
}: {
  addressInfo: string | null;
}) {
  const t = await getTranslations();
  const basketSummary = await getBasketCheckoutSummary();
  const basket = basketSummary.basketEntries;
  const basketEntriesCount = basket.length || 0;

  return (
    <div className="w-full flex flex-col gap-[18px]">
      <h2 className="text-2xl font-serif">{t("Checkout")}</h2>
      <div className="flex justify-between text-sm w-full">
        <span>{t("items", { count: basketEntriesCount })}</span>
        <Link className="link text-gray-passive underline" href="/basket">
          {t("edit basket")}
        </Link>
      </div>
      <CheckoutSummaryEntryList basket={basket}></CheckoutSummaryEntryList>
      <div className="text-xl flex w-full gap-7">
        <span>{t("Total cost:")}</span>
        <span>{`${CURRENCY_SIGN} ${t(formatCost(basketSummary.costTotal))}`}</span>
      </div>
      <div className={`${!addressInfo ? "text-red-warning" : ""}`}>
        {!addressInfo
          ? t("Please add a delivery location address for your order")
          : addressInfo}
      </div>
    </div>
  );
}
