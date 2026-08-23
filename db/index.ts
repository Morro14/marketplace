import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle(sqlite);
