import dayjs from "dayjs";
import { prisma } from "../../prisma/prisma.js";
import { Gender } from "@prisma/client";

export async function createUserInDatabase({
  name,
  email,
  cpf,
  gender,
  photo,
  password,
  birthDate,
}: {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  cpf: string;
  gender?: Gender;
  photo?: string;
}) {

  const formattedBirthDate = birthDate && dayjs(birthDate, "DD-MM-YYYY HH:mm:ss").isValid()
  ? dayjs(birthDate, "DD-MM-YYYY HH:mm:ss").toISOString()
  : null;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      cpf,
      gender,
      photo,
      password,
      birthDate: formattedBirthDate,
    }
  });

  return {
    ...user,
    birthDate: birthDate ? dayjs(user.birthDate).format("DD-MM-YYYY") : null,
  };
}
