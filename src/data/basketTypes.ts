import { basketEntries } from "@/db/schema";

export type BasketEntry = typeof basketEntries.$inferSelect;
