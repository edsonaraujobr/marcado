import { prisma } from "../../prisma/prisma.js";
import { createUserType, userCreatedType } from "../types/user.types.js";

export const findAll = async () => {
  return prisma.user.findMany();
};

export const createUser = async ({ data } : { data: createUserType }): Promise<userCreatedType> => {
  let user;
  try {
    user = await prisma.user.create({data});
  } catch (error) {
    console.error("Erro de validação:", error); 
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
