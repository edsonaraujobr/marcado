import * as userService from "../services/users.services.js";
import { userCreateValidator } from "../validators/user.validators.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Erro ao buscar usuários");
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, photo, gender, password, birthDate, cpf } = req.body;

    const data = {
      name, email, photo, gender, password, birthDate, cpf
    }

    try {
      userCreateValidator.parse(data);
    } catch (error) {
      console.error("Erro de validação:", error.errors); 
      return res.status(400).json({ error: error.errors });
    }

    const user = await userService.createUser({data});
    res.status(200).json(user);

  } catch (error) {
    res.status(500).send("Erro ao criar usuário");
  }
};
