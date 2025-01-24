import z from "zod";
import dotenv from "dotenv"

dotenv.config();

const envSchema = z.object({
  PORT_SERVER: z.string(),
  DATABASE_URL: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
