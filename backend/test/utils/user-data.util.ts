import { Gender } from "@prisma/client";

export const userData = {
  validUser: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-2000",
    cpf: "12345678910",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userWithoutOptionalFields: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    cpf: "12345678910",
  },
};
