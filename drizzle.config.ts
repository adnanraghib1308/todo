import type { Config } from "drizzle-kit";

export default {
  schema: "./db/Todos.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
  }
} satisfies Config;