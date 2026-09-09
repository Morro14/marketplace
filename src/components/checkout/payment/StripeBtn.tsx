import stripeLogo from "@/src/assets/stripe-logo.svg";
import { Currency } from "@/src/utils/appVars";
import PaymentMethodButton from "./PaymentMethodButton";

export default function StripeBtn({
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
      method="stripe"
      logo={stripeLogo}
      altText="stripe-logo"
      amount={amount}
      currency={currency}
      mode={mode}
    />
  );
}
