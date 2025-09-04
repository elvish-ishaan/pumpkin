-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('FREE', 'STANDARD', 'PREMIUM');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagesUploaded" INTEGER NOT NULL DEFAULT 0,
    "noOfPrompts" INTEGER NOT NULL DEFAULT 0,
    "planType" "public"."PlanType" NOT NULL DEFAULT 'FREE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
