"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Currency } from "@/src/utils/appVars";
import { useSearchParams } from "next/navigation";
import { type PaymentMethods } from "@/src/types/payment";

export default function PaymentMethodButton({
  method,
  logo,
  altText,
  amount,
  currency,
  mode = "mock",
}: {
  method: PaymentMethods;
  logo: StaticImageData;
  altText: string;
  amount: number;
  currency: Currency;
  mode?: "mock" | "prod";
}) {
  const params = useSearchParams();
  const selectedMethod = params.get("method");
  const isActive = method === selectedMethod;

  return (
    <Link
      href={`/checkout?method=${method}`}
      className={`flex payment-method-btn btn border border-[#3C4043] ${!isActive ? "" : "outline-3 outline-accent"} `}
      data-active={isActive}
    >
      <Image src={logo} alt={altText} className="m-auto"></Image>
    </Link>
  );
}
