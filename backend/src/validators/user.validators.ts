import { Gender } from "@prisma/client";
import dayjs from "dayjs";
import { FORMAT_DATE_REGEX } from "../utils/constants.util.js";
import z from "zod";

export const userCreateValidator = z.object({
  name: z.string().optional(),
  email: z.string().email("Email inválido! Seu email precisa de um @ e um domínio"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF Inválido, use o formato XXX.XXX.XXX-XX"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gênero inválido. Escolha um valor válido (MASCULINO/FEMININO)"})
  }).optional(),
  photo: z.string().optional(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres!")
    .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra")
    .regex(/\d/, "A senha deve conter pelo menos um dígito"),
  birthDate: z
    .string()
    .optional()
    .refine(
      (date) =>
        !date ||
        (FORMAT_DATE_REGEX.test(date) && dayjs(date, "DD-MM-YYYY", true).isValid()),
      "Formato de data inválido. Use o formato DD-MM-YYYY.",
    ),
});
