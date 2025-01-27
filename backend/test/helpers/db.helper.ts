import { prisma } from "../../prisma/prisma.js";

export const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados");
  }
};

export const clearDB = async () => {
  try {
    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.barber.deleteMany(),
      prisma.combo.deleteMany(),
      prisma.haircut.deleteMany(),
      prisma.sale.deleteMany(),
      prisma.scheduling.deleteMany(),
    ]);
  } catch (error) {
    console.error("Erro ao limpar o banco de dados", error);
  }
};
