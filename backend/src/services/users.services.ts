import { DateBirthdayFutureError } from "../errors/date-birthday-future.errors.js";
import { InternalServerError } from "../errors/internal-server.errors.js";
import { MaximumAgeError } from "../errors/maximum-age.errors.js";
import { NotFoundError } from "../errors/not-found-errors.js";
import { UserAlreadyExistsError } from "../errors/user-already-exists.errors.js";
import * as userRepository from "../repositories/users.repositories.js";
import { createUserType, userCreatedType } from "../types/user.types.js";
import { MAX_AGE } from "../utils/constants.util.js";
import { hashPassword } from "../utils/hash.util.js";
import dayjs from "dayjs";

export const getAllUsers = async () => {
  return userRepository.findAll();
};

export const createUser = async ({ data } : { data: createUserType }): Promise<userCreatedType> => {
  if (dayjs(data.birthDate).isAfter(new Date())) {
    throw new DateBirthdayFutureError({
      message: "Data de nascimento não pode ser no futuro!",
    });
  }

  const age = dayjs().diff(dayjs(data.birthDate), "year");
  if (age > MAX_AGE) {
    throw new MaximumAgeError({
      message: `A idade máxima permitida é de ${MAX_AGE} anos!`,
    });
  }
  
  const existingUserEmail = await userRepository.findUserByEmail(data.email);
  if(existingUserEmail) {
    throw new UserAlreadyExistsError({
      message: "Já existe usuário cadastrado com este email!",
    })
  }

  const existingUserCPF = await userRepository.findUserByCPF(data.cpf);
  if(existingUserCPF) {
    throw new UserAlreadyExistsError({
      message: "Já existe usuário cadastrado com este CPF!",
    })
  }

  const hashedPassword = await hashPassword(data.password);

  const formattedBirthDate = data.birthDate && dayjs(data.birthDate, "DD-MM-YYYY HH:mm:ss").isValid()
  ? dayjs(data.birthDate, "DD-MM-YYYY HH:mm:ss").toISOString()
  : null;

  const user = await userRepository.createUser({
    data: {
      ...data,
      password: hashedPassword,
      birthDate: formattedBirthDate
    },
  });

  return {
    ...user,
    birthDate: user.birthDate ? dayjs(user.birthDate).format("DD-MM-YYYY") : null,
  }
};

export const deleteUserByID = async ( id  : { id: string; }) => {
  const userExists = await userRepository.findUserByID(id);
  if(!userExists) {
    throw new NotFoundError({
      message: "Usuário não encontrado!",
    })
  }

  await userRepository.deleteUserByID(id);
}
