"use client";
import { useAppSelector } from "@/src/state/hooks";
import { selectTotalCost } from "@/src/state/basketSlice";
import GooglePayBtn from "./GooglePayBtn";
import PayPalBtn from "./PayPalBtn";
import StripeBtn from "./StripeBtn";
import { selectCurrency } from "@/src/state/checkoutSlice";
import { PaymentMethods } from "@/src/types/payment";

export default function PaymentService({
  methodSelected,
}: {
  methodSelected: PaymentMethods | null;
}) {
  // Common data for all payment methods
  const amount = useAppSelector(selectTotalCost);
  const currency = useAppSelector(selectCurrency);

  return (
    <div className="flex justify-between w-full">
      <GooglePayBtn amount={amount} currency={currency} />
      <PayPalBtn amount={amount} currency={currency} />
      <StripeBtn amount={amount} currency={currency} />
    </div>
  );
}
