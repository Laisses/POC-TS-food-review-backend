CREATE TABLE "places" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"category" TEXT NOT NULL,
	"rating" TEXT
);