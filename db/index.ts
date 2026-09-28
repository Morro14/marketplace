import { drizzle } from "drizzle-orm/better-sqlite3";
import { relations } from "./relations";

export const db = drizzle(process.env.DB_FILE_NAME!, { relations });
// export const db = drizzle(sqlite, { relations });
