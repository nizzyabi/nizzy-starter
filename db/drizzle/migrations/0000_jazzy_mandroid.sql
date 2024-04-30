CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar(300) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
