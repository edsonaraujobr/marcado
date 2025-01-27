/*
  Warnings:

  - You are about to drop the column `time` on the `combos` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `schedulings` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `schedulings` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "combos" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "time",
ADD COLUMN     "isActive" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "schedulings" DROP COLUMN "Date",
DROP COLUMN "time",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
