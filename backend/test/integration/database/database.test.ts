import { expect } from "chai";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Teste de conexao com o banco de dados", async () => {

  after(async () => {
    await prisma.$disconnect();
  });

  it("Deve se conectar ao banco de dados", async () => {
    try {
      const result = await prisma.$queryRaw`SELECT 1`;
      expect(result).to.be.an("array");
    } catch (error) {
      throw new Error("Não foi possível se conectar ao banco de dados!");
    }
  });
});
