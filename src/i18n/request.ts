import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { readFile } from "fs/promises";
import { join } from "path";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  const messagesPath = join(process.cwd(), "messages", `${locale}.json`);
  const messagesContent = await readFile(messagesPath, "utf-8");
  const messages = JSON.parse(messagesContent);
  const result = {
    locale,
    messages,
    onError(error) {
      if (error.code !== "MISSING_MESSAGE") {
        return;
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${key}`;
    },
  };
  return result;
});
