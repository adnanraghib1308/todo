import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  priority: varchar("priority", { length: 255 }),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});