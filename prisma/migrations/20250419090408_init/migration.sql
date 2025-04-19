-- CreateEnum
CREATE TYPE "TarotType" AS ENUM ('MONTHLY_STUDY', 'ROMMANCE', 'TODAY');

-- CreateTable
CREATE TABLE "latest_tarot" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "version" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "type" "TarotType" NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "latest_tarot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "latest_tarot_uuid_key" ON "latest_tarot"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "latest_tarot_user_uuid_type_key" ON "latest_tarot"("user_uuid", "type");
