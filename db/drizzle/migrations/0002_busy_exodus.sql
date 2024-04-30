CREATE TABLE IF NOT EXISTS "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fullName" varchar NOT NULL,
	"age" numeric NOT NULL
);
--> statement-breakpoint
DROP TABLE "accounts";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" varchar NOT NULL;