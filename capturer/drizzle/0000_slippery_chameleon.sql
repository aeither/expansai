CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"role" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
