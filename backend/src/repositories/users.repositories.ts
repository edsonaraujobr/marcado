import { User } from "@prisma/client";
import { prisma } from "../../prisma/prisma.js";
import { InternalServerError } from "../errors/internal-server.errors.js";
import { createUserType, userCreatedType } from "../types/user.types.js";

export const findAll = async () => {
  return prisma.user.findMany();
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } })
}

export const findUserByCPF = async (cpf: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { cpf } })
}

export const createUser = async ({ data } : { data: createUserType }): Promise<userCreatedType> => {
  let user;

  try {
    user = await prisma.user.create({data});
  } catch (error) {
    throw new InternalServerError({
      message: "Erro ao inserir usuário no banco de dados.",
    });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    birthDate: user.birthDate,
    gender: user.gender,
    photo: user.photo,
  }
};
