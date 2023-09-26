import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { user } from "./schema";

export const db = drizzle(sql);

export const getTable = async () => {
  const selectResult = await db.select().from(user);
  console.log("Results", selectResult);
  return selectResult;
};
