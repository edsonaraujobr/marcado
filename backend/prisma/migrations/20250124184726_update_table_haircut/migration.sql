-- DropForeignKey
ALTER TABLE "haircuts" DROP CONSTRAINT "haircuts_barberId_fkey";

-- AddForeignKey
ALTER TABLE "haircuts" ADD CONSTRAINT "haircuts_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
