export const CURRENCY = "USD";
export const CURRENCY_SIGNS = { USD: "$" } as const;
export type Currency = keyof typeof CURRENCY_SIGNS;
export const CURRENCY_SIGN = CURRENCY_SIGNS[CURRENCY];
export const SORT_BY = ["name", "price", "nameDesc", "priceDesc"] as const
