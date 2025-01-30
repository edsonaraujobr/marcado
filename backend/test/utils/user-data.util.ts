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
  userWeekPassword: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userWeekPassword02: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edsonn",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userWeekPassword03: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "123456789",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userInvalidEmail: {
    name: "Edson Araújo",
    email: "edson",
    password: "edson1010",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userInvalidCPF: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-2000",
    cpf: "12345678910",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userInvalidGender: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-2000",
    cpf: "123.456.789-10",
    gender: "Example",
    photo: "link.com"
  },
  userInvalidBirthDate: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10102000",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userInvalidBirthDateFuture: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-2026",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
  userInvalidOldBirthDate: {
    name: "Edson Araújo",
    email: "edson@gmail.com",
    password: "edson1010",
    birthDate: "10-10-1800",
    cpf: "123.456.789-10",
    gender: Gender.MASCULINO,
    photo: "link.com"
  },
};
