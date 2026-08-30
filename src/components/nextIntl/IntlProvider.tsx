"use client";
import { NextIntlClientProvider, IntlErrorCode } from "next-intl";

export default function IntlProviderCustom({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
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
