import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.VITE_DATABASE_URL) throw new Error("VITE_DATABASE_URL not found");

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: (process.env.VITE_DATABASE_URL + "?sslmode=require") as string,
  },
} satisfies Config;
