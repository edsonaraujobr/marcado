import dayjs from "dayjs";
import { prisma } from "../../prisma/prisma.js";

export async function createSaleInDatabase({
  description,
  newPrice,
  isActive,
  expiresIn,
}: {
  description?: string;
  newPrice: number;
  isActive: boolean;
  expiresIn?: string;
}) {
  const formattedExpiresIn = expiresIn ? dayjs(expiresIn, "DD-MM-YYYY HH:mm:ss").toISOString() : null;

  const sale = await prisma.sale.create({
    data: {
      description,
      newPrice,
      isActive,
      expiresIn: formattedExpiresIn,
    }
  });

  return { 
    ...sale,
    expiresIn: dayjs(sale.expiresIn).format("DD-MM-YYYY hh:mm:ss")
  };
}
