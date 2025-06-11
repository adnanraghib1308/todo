import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
  connection: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
});