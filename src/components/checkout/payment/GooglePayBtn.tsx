"use client";
import Image from "next/image";
import Link from "next/link";
import googlePayLogo from "@/src/assets/google-pay-logo.svg";
import { Currency } from "@/src/utils/appVars";

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
    <Link
      href="/checkout?method=google-pay"
      className="flex payment-method-btn btn border border-[#3C4043]"
    >
      <Image
        src={googlePayLogo}
        alt="google-pay-logo"
        className="m-auto"
      ></Image>
    </Link>
  );
}
