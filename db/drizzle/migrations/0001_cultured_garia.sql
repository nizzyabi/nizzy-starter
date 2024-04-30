CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar(300) NOT NULL,
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
