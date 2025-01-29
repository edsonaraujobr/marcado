import * as userRepository from "../repositories/users.repositories.js";
import { createUserType, userCreatedType } from "../types/user.types.js";
import { hashPassword } from "../utils/hash.util.js";
import dayjs from "dayjs";

export const getAllUsers = async () => {
  return userRepository.findAll();
};

export const createUser = async ({ data } : { data: createUserType }): Promise<userCreatedType> => {
  
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
