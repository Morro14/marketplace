import { getTranslations } from "next-intl/server";
import GooglePayBtn from "./GooglePayBtn";
import PayPalBtn from "./PayPalBtn";
import StripeBtn from "./StripeBtn";
import PaymentService from "./PaymentService";

export default async function Payment() {
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-2">
      <h5 className="checkout-section-label">{t("Choose payment method")}</h5>
      <div className="flex justify-between">
        <PaymentService>
          <GooglePayBtn></GooglePayBtn>
          <PayPalBtn></PayPalBtn>
          <StripeBtn></StripeBtn>
        </PaymentService>
      </div>
    </div>
  );
}
