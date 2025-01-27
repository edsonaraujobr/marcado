-- DropForeignKey
ALTER TABLE "combos" DROP CONSTRAINT "combos_haircutId_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_haircutId_fkey";

-- AddForeignKey
ALTER TABLE "combos" ADD CONSTRAINT "combos_haircutId_fkey" FOREIGN KEY ("haircutId") REFERENCES "haircuts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_haircutId_fkey" FOREIGN KEY ("haircutId") REFERENCES "haircuts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
