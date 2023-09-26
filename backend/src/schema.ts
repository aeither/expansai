import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  role: text("role").$type<"bnb" | "arb">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const getTable = async () => {
  const selectResult = await db.select().from(user);
  console.log("Results", selectResult);
  return selectResult;
};
