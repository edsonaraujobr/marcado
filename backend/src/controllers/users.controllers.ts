import { ZodError } from "zod";
import * as userService from "../services/users.services.js";
import { userCreateValidator } from "../validators/user.validators.js";
import { BadInputError } from "../errors/bad-input.errors.js";
import { InternalServerError } from "../errors/internal-server.errors.js";
import { CustomError } from "../errors/custom.errors.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Erro ao buscar usuários");
  }
};

export const createUser = async (req, res) => {

  const { name, email, photo, gender, password, birthDate, cpf } = req.body;

  const data = {
    name, email, photo, gender, password, birthDate, cpf
  }

  try {
    userCreateValidator.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const passwordError = error.errors.find((err) =>
        err.path.includes("password"),
      );
      if (passwordError) {
        return res.status(400).json(
          new BadInputError({
            message: "A senha fornecida não é segura. É necessário no mínimo 6 caracteres, incluindo pelo menos um dígito e uma letra.",
          })
        );
      }
      return res.status(400).json(new BadInputError({
        message: error.errors[0]?.message || "Dados inválidos"
      }));
    }

    return res.status(500).json(new InternalServerError());
  }

  try {
    const user = await userService.createUser({data});
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.code).json(error.toJSON());
    }
    res.status(500).json({ message: "Erro interno ao criar usuário" });
  }
};

export const deleteUserByID = async (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(400).json(
      new BadInputError({
        message: "É necessário passar um ID para remover o usuário!",
      })
    );
  }
  try {
    await userService.deleteUserByID(id);
    res.status(200).json({message: "Estudante excluido com sucesso!"})
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.code).json(error.toJSON());
    }
    res.status(500).json({ message: "Erro interno ao criar usuário" });
  }
}
