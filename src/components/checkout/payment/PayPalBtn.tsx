import Image from "next/image";
import Link from "next/link";
import paypalLogo from "@/src/assets/paypal-logo.svg";
import { Currency } from "@/src/utils/appVars";

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
    <Link
      href="/checkout?method=paypal"
      className="flex payment-method-btn btn border border-[#3C4043]"
    >
      <Image src={paypalLogo} alt="google-pay-logo" className="m-auto"></Image>
    </Link>
  );
}
