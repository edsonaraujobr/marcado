import { Gender } from "@prisma/client";

export interface createUserType {
  name: string;
  email: string;
  photo: string | null;
  gender: Gender;
  password: string;
  birthDate: string | null;
  cpf: string;
}

export interface userCreatedType {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  gender: Gender | null;
  birthDate: string | null;
}
