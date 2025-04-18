/*
  Warnings:

  - You are about to drop the `last_tarot_readings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "last_tarot_readings" DROP CONSTRAINT "last_tarot_readings_user_id_fkey";

-- DropTable
DROP TABLE "last_tarot_readings";

-- CreateTable
CREATE TABLE "latest_tarot" (
    "id" SERIAL NOT NULL,
    "version" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "type" "TarotType" NOT NULL,
    "data" JSONB NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "latest_tarot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "latest_tarot_user_id_type_key" ON "latest_tarot"("user_id", "type");

-- AddForeignKey
ALTER TABLE "latest_tarot" ADD CONSTRAINT "latest_tarot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
