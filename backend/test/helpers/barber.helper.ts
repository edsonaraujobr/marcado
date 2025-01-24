import dayjs from "dayjs";
import { prisma } from "../../prisma/prisma.js";
import { Gender, Rating } from "@prisma/client";

export async function createBarberInDatabase({
  name,
  email,
  cpf,
  gender,
  photo,
  password,
  birthDate,
  rating
}: {
  name: string;
  email: string;
  password: string;
  birthDate?: string;
  cpf: string;
  gender?: Gender;
  photo?: string;
  rating?: Rating;
}) {

  const formattedBirthDate = birthDate ? dayjs(birthDate, "DD-MM-YYYY").toISOString() : null;

  const barber = await prisma.barber.create({
    data: {
      name,
      email,
      cpf,
      gender,
      photo,
      password,
      birthDate: formattedBirthDate,
      rating,
    }
  });

  return {
    ...barber,
    birthDate: birthDate ? dayjs(barber.birthDate).format("DD-MM-YYYY") : null,
  };
}
