import express from "express"
import { env } from "./env.js"
import cors from "cors";
import users from "./routes/users.routes.js";

const port = env.PORT_SERVER;
const app = express()

app.use(express.json())
app.use(cors());
app.use("/", users);

export const server = app.listen(port, () => {
  console.log("Servidor executando!")
})
