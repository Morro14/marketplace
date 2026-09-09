import googlePayLogo from "@/src/assets/google-pay-logo.svg";
import { Currency } from "@/src/utils/appVars";
import PaymentMethodButton from "./PaymentMethodButton";

export default function GooglePayBtn({
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
      method="google-pay"
      logo={googlePayLogo}
      altText="google-pay-logo"
      amount={amount}
      currency={currency}
      mode={mode}
    />
  );
}
