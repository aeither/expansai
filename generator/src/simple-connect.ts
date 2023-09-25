import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { user } from "./schema/schema";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const getExampleTable = async () => {
  const selectResult = await db.select().from(user);
  console.log("Results", selectResult);
  return selectResult;
};
