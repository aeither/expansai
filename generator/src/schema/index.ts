import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL not found");

const connectionString = process.env.POSTGRES_URL + "?sslmode=require";

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
};
main();
