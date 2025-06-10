-- CreateTable
CREATE TABLE "anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER,
    "episodes" INTEGER,
    "studio" TEXT,
    "rating" INTEGER,
    "genre" TEXT,
    "status" TEXT,
    "image" TEXT,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER,
    "volumes" INTEGER,
    "chapters" INTEGER,
    "author" TEXT,
    "rating" DECIMAL(65,30),
    "genre" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
