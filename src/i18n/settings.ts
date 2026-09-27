export const locales = ["en"] as const;
export type Locale = (typeof locales)[number];
export const defautlLocale: Locale = "en";
