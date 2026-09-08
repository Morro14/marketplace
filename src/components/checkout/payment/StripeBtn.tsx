import Image from "next/image";
import Link from "next/link";
import stripeLogo from "@/src/assets/stripe-logo.svg";
import { Currency } from "@/src/utils/appVars";

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
    <Link
      href="/checkout?method=stripe"
      className="flex payment-method-btn btn border border-[#3C4043]"
    >
      <Image src={stripeLogo} alt="google-pay-logo" className="m-auto"></Image>
    </Link>
  );
}
