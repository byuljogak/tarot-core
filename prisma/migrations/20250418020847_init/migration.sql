-- CreateEnum
CREATE TYPE "TarotType" AS ENUM ('MONTHLY_STUDY', 'ROMMANCE', 'TODAY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "last_tarot_readings" (
    "id" SERIAL NOT NULL,
    "version" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "type" "TarotType" NOT NULL,
    "data" JSONB NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "last_tarot_readings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "last_tarot_readings_user_id_type_key" ON "last_tarot_readings"("user_id", "type");

-- AddForeignKey
ALTER TABLE "last_tarot_readings" ADD CONSTRAINT "last_tarot_readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
