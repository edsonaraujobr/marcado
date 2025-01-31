import { User } from "@prisma/client";
import { prisma } from "../../prisma/prisma.js";
import { InternalServerError } from "../errors/internal-server.errors.js";
import { createUserType, userCreatedType } from "../types/user.types.js";

export const findAll = async () => {
  return prisma.user.findMany();
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } })
  } catch (error) {
    throw new InternalServerError({
      message: "Erro ao deletar usuário no banco de dados.",
    });
  }
}

export const findUserByID = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { id } })
  } catch (error) {
    throw new InternalServerError({
      message: "Erro ao deletar usuário no banco de dados.",
    });
  }
}

export const findUserByCPF = async (cpf: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { cpf } })
  } catch (error) {
    throw new InternalServerError({
      message: "Erro ao deletar usuário no banco de dados.",
    });
  }
}

export const deleteUserByID = async (id: string) => {
  try {
    await prisma.user.delete({ where: { id } })
  } catch (error) {
    throw new InternalServerError({
      message: "Erro ao deletar usuário no banco de dados.",
    });
  }
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
