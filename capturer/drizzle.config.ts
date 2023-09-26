import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not found");

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: (process.env.POSTGRES_URL + "?sslmode=require") as string,
  },
} satisfies Config;
