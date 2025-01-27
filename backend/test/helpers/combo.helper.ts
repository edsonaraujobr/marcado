import { prisma } from "../../prisma/prisma.js";

export async function createComboInDatabase({
  description,
}: {
  description: string;
}) {

  const combo = await prisma.combo.create({
    data: {
      description,
    }
  });

  return combo;
}
