import CheckoutSummary from "@/src/components/checkout/CheckoutSummary";
import Payment from "@/src/components/checkout/payment/Payment";
import { getDeliveryInfo } from "@/src/data/deliveryQueries";
import { formatDeliveryInfo } from "@/src/utils/format";
import { getTranslations } from "next-intl/server";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";

export default async function Checkout({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const t = await getTranslations();
  const deliveryInfo = await getDeliveryInfo();
  const deliveryInfoFormatted = deliveryInfo
    ? formatDeliveryInfo(deliveryInfo)
    : null;
  return (
    <div className="content-container flex lg:flex-row flex-col-reverse bg-bg drop-shadow-lg mt-6 pb-8">
      <div className="lg:basis-[540px] flex flex-col gap-8 px-8 pt-4">
        {!deliveryInfo ? (
          <div>
            <div className="text-sm text-gray-passive">
              {t("You do not have any delivery address saved currently")}
            </div>
            <Link className="text-xl underline" href="/add-address">
              {t("Add delivery address")}
            </Link>
          </div>
        ) : (
          <div className="">
            <span className="checkout-section-label">
              {t("Delivery information")}
            </span>
            <div className="text-xl">{deliveryInfoFormatted}</div>
            <Link
              href="/add-address"
              className="link text-sm text-gray-passive underline"
            >
              {t("change delivery info")}
            </Link>
          </div>
        )}
        <Payment></Payment>
      </div>
      <div className="w-px h-full bg-gray-300"></div>
      <div className="lg:basis-62 lg:h-150">
        <CheckoutSummary addressInfo={deliveryInfoFormatted}></CheckoutSummary>
      </div>
    </div>
  );
}
