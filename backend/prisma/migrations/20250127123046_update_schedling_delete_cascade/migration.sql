-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_barberId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_haircutId_fkey";

-- DropForeignKey
ALTER TABLE "schedulings" DROP CONSTRAINT "schedulings_userId_fkey";

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_haircutId_fkey" FOREIGN KEY ("haircutId") REFERENCES "haircuts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
