/*
  Warnings:

  - The values [ONE,TWO,THREE,FOUR,FIVE] on the enum `Rating` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `haircutId` on the `combos` table. All the data in the column will be lost.
  - You are about to drop the column `haircutId` on the `sales` table. All the data in the column will be lost.
  - Added the required column `type` to the `haircuts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresIn` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HaircutType" AS ENUM ('NORMAL', 'PROMOCAO', 'COMBO');

-- AlterEnum
BEGIN;
CREATE TYPE "Rating_new" AS ENUM ('UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO');
ALTER TABLE "barbers" ALTER COLUMN "rating" TYPE "Rating_new" USING ("rating"::text::"Rating_new");
ALTER TYPE "Rating" RENAME TO "Rating_old";
ALTER TYPE "Rating_new" RENAME TO "Rating";
DROP TYPE "Rating_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "combos" DROP CONSTRAINT "combos_haircutId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_haircutId_fkey";

-- AlterTable
ALTER TABLE "combos" DROP COLUMN "haircutId";

-- AlterTable
ALTER TABLE "haircuts" ADD COLUMN     "comboId" TEXT,
ADD COLUMN     "saleId" TEXT,
ADD COLUMN     "type" "HaircutType" NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "haircutId",
ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "haircuts" ADD CONSTRAINT "haircuts_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "combos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "haircuts" ADD CONSTRAINT "haircuts_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
