import { defineRouting } from "next-intl/routing";
import { defautlLocale, locales } from "./settings";

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",

  // localePrefix: "always",
});
