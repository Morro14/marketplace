"use client";
import { useAppSelector } from "@/src/state/hooks";
import { selectTotalCost } from "@/src/state/basketSlice";
import GooglePayBtn from "./GooglePayBtn";
import PayPalBtn from "./PayPalBtn";
import StripeBtn from "./StripeBtn";
import { selectCurrency } from "@/src/state/checkoutSlice";

export default function PaymentService() {
  // common logic for payment methods
  const amount = useAppSelector(selectTotalCost);
  const currency = useAppSelector(selectCurrency);
  return (
    <div className="flex justify-between w-full">
      <GooglePayBtn amount={amount} currency={currency}></GooglePayBtn>
      <PayPalBtn amount={amount} currency={currency}></PayPalBtn>
      <StripeBtn amount={amount} currency={currency}></StripeBtn>
    </div>
  );
}
