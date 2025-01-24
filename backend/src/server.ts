import express from "express"
import { env } from "./env"

const port = env.PORT_SERVER;
const app = express()

app.use(express.json())

export const server = app.listen(port, () => {
  console.log("Servidor executando!")
})
