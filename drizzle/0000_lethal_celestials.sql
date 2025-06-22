CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255),
	"priority" varchar(255),
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
