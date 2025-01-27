/*
  Warnings:

  - You are about to drop the column `name` on the `combos` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `combos` table. All the data in the column will be lost.
  - Added the required column `description` to the `combos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "combos" DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "description" TEXT NOT NULL;
