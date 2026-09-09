"use client";
import { PaymentMethods } from "@/src/types/payment";
import PaymentService from "./PaymentService";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Payment() {
  const t = useTranslations("Payment");
  const params = useSearchParams();
  const method = params.get("method") as PaymentMethods | null;
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h5 className="checkout-section-label">{t("Choose payment method")}</h5>
        <PaymentService methodSelected={method}></PaymentService>
      </div>
      <div>
        {method ? (
          <span>
            {t.rich("credit-card-method-message", {
              creditCard: (chunks) => (
                <Link
                  className="underline text-accent-2-darker text-lg ml-1"
                  href="/checkout"
                >
                  {chunks}
                </Link>
              ),
            })}
          </span>
        ) : (
          <div className="text-gray-passive text-xl mt-4">
            {t("Here will be card payment form")}
          </div>
        )}
        {method ? (
          <div className="text-gray-passive text-xl mt-4">
            {t(`Here will be ${method} payment form!`)}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
