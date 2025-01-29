import { Gender } from "@prisma/client";

export const userData = {
  validUser: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userWithoutOptionalFields: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    cpf: "123.456.789-10",
  },
};
