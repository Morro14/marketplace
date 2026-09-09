import paypalLogo from "@/src/assets/paypal-logo.svg";
import { Currency } from "@/src/utils/appVars";
import PaymentMethodButton from "./PaymentMethodButton";

export default function PayPalBtn({
  amount,
  currency,
  mode = "mock",
}: {
  amount: number;
  currency: Currency;
  mode?: "mock" | "prod";
}) {
  return (
    <PaymentMethodButton
      method="paypal"
      logo={paypalLogo}
      altText="paypal-logo"
      amount={amount}
      currency={currency}
      mode={mode}
    />
  );
}
