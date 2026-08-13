"use client";
import { NextIntlClientProvider, IntlErrorCode } from "next-intl";

export default function IntlProviderCustom({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      onError={(error) => {
        if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
          console.error(error);
        }
      }}
      getMessageFallback={({ namespace, key }) => {
        return `${key}`;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
