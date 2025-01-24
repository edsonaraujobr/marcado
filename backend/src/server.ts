import express from "express"
import { env } from "./env"

const port = env.PORT;
const app = express()

app.use(express.json())

app.listen(port, () => {
  console.log("Servidor executando!")
})
