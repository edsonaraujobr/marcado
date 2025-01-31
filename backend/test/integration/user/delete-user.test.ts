import axios from "axios";
import { clearDB, connectDB } from "../../helpers/db.helper.js"
import { createUserInDatabase } from "../../helpers/user.helper.js";
import { userData } from "../../utils/user-data.util.js";
import { expect } from "chai";

describe("Teste de delete de usuário", async () => {
  const { validUser } = userData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  after(async () => {
    await connectDB();
  })

  afterEach(async () => {
    await clearDB();
  })

  it("Deve deletar usuário com sucesso pelo ID", async () => {
    const user = await createUserInDatabase(validUser);
    const response = await axios.delete(`http://localhost:3030/user/delete/${user.id}`)
    expect(response.status).to.equal(200);
    expect(response.data.message).to.equal("Estudante excluido com sucesso!");
  });

  it("Deve retornar erro ao deletar usuário pelo ID pois o usuário não existe", async () => {
    const user = await createUserInDatabase(validUser);
    await clearDB();
    try {
      await axios.delete(`http://localhost:3030/user/delete/${user.id}`)
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por usuario inexistente");
    } catch (error) {
      expect(error.response.data.error).to.equal("notFoundError")
      expect(error.response.data.message).to.equal("Usuário não encontrado!")
      expect(error.response.data.code).to.equal(404)
    }
  });

  it("Deve retornar erro ao deletar usuário pelo ID pois o ID não foi passado", async () => {
    try {
      await axios.delete(`http://localhost:3030/user/delete/`)
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por falta de ID");
    } catch (error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("É necessário passar um ID para remover o usuário!")
      expect(error.response.data.code).to.equal(400)
    }
  });
})
