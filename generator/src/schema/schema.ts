import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  role: text("role").$type<"bnb" | "arb">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
