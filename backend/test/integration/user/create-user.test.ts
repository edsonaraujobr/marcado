import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { userData } from "../../utils/user-data.util.js";
import { createUserInDatabase } from "../../helpers/user.helper.js";
import axios from "axios";
import { Gender } from "@prisma/client";
import { assert } from "console";
import { MAX_AGE } from "../../../src/utils/constants.util.js";

describe("Teste de criacao de usuario", async () => {
  const { 
    validUser, 
    userWithoutOptionalFields, 
    userWeekPassword, 
    userWeekPassword02,
    userWeekPassword03,
    userInvalidEmail, 
    userInvalidCPF,
    userInvalidGender,
    userInvalidBirthDate,
    userInvalidBirthDateFuture,
    userInvalidOldBirthDate
  } = userData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve criar um usuário com todas as informacoes no banco de dados", async () => {
    const user = await createUserInDatabase(validUser);
    
    expect(user).to.be.an("object");
    expect(user).to.have.property("id");
    expect(user.cpf).to.equal(validUser.cpf);
    expect(user.email).to.equal(validUser.email);
    expect(user.gender).to.equal(validUser.gender);
    expect(user.birthDate).to.equal(validUser.birthDate);
    expect(user.photo).to.equal(validUser.photo);
    expect(user.password).to.equal(validUser.password);
    expect(user.name).to.equal(validUser.name);
  });

  it("Deve criar um usuário sem os campos opcionais no banco de dados", async () => {
    const user = await createUserInDatabase(userWithoutOptionalFields);
    
    expect(user).to.be.an("object");
    expect(user).to.have.property("id");
    expect(user.cpf).to.equal(userWithoutOptionalFields.cpf);
    expect(user.email).to.equal(userWithoutOptionalFields.email);
    expect(user.gender).to.be.null;
    expect(user.birthDate).to.be.null;
    expect(user.photo).to.be.null;
    expect(user.password).to.equal(userWithoutOptionalFields.password);
    expect(user.name).to.equal(userWithoutOptionalFields.name);
  });

  it("Deve retornar erro ao criar dois usuarios com mesmo cpf no banco de dados", async () => {
    await createUserInDatabase({
      ...validUser,
      email: "teste@gmail.com"
    });
    try {
      await createUserInDatabase(validUser);
      expect.fail("O erro de criação de cpf duplo não foi lançado");
    } catch (error) {
      expect(error).to.have.property("message").that.includes("Unique constraint failed on the fields: (`cpf`)");
    }
  });

  it("Deve retornar erro ao criar dois usuarios com mesmo email no banco de dados", async () => {
    await createUserInDatabase({
      ...validUser,
      cpf: "1010101010"
    });
    try {
      await createUserInDatabase(validUser);
      expect.fail("O erro de criação de email duplo não foi lançado");
    } catch (error) {
      expect(error).to.have.property("message").that.includes("Unique constraint failed on the fields: (`email`)");
    }
  });

  it("Deve criar um usuario com sucesso atraves da API", async () => {
    const response = await axios.post("http://localhost:3030/user/create", validUser)

    expect(response.status).to.equal(201);
    const user = response.data;

    expect(user).to.have.property("id");
    expect(user.name).to.equal(validUser.name);
    expect(user.email).to.equal(validUser.email);
    expect(user.birthDate).to.equal(validUser.birthDate);
    expect(user.gender).to.equal(validUser.gender);
    expect(user.photo).to.equal(validUser.photo);
  });

  it("Deve criar um usuario sem os campos opcionais atraves da API", async () => {
    const response = await axios.post("http://localhost:3030/user/create", userWithoutOptionalFields )

    expect(response.status).to.equal(201);
    const user = response.data;

    expect(user).to.have.property("id");
    expect(user.name).to.equal(validUser.name);
    expect(user.email).to.equal(validUser.email);
    expect(user.birthDate).to.be.null;
    expect(user.gender).to.be.null;
    expect(user.photo).to.be.null;
  });

  it("Deve retornar erro ao criar usuario por senha com menos de 6 caracteres", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userWeekPassword )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da senha fraca");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("A senha fornecida não é segura. É necessário no mínimo 6 caracteres, incluindo pelo menos um dígito e uma letra.")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por senha fraca por falta de numero", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userWeekPassword02 )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da senha fraca");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("A senha fornecida não é segura. É necessário no mínimo 6 caracteres, incluindo pelo menos um dígito e uma letra.")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por senha fraca por falta de caractere", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userWeekPassword03 )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da senha fraca");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("A senha fornecida não é segura. É necessário no mínimo 6 caracteres, incluindo pelo menos um dígito e uma letra.")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por email inválido", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidEmail )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa do email inválido");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("Email inválido! Seu email precisa de um @ e um domínio")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por CPF inválido", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidCPF )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa do CPF inválido");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("CPF Inválido, use o formato XXX.XXX.XXX-XX")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por genero inválido", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidGender )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa do genero inválido");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("Gênero inválido. Escolha um valor válido (MASCULINO/FEMININO)")
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario por data de nascimento inválido", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidBirthDate )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da data de nascimento inválida");
    } catch(error) {
      expect(error.response.data.error).to.equal("BadInputError")
      expect(error.response.data.message).to.equal("Formato de data inválido. Use o formato DD-MM-YYYY.")
      expect(error.response.data.code).to.equal(400)
    }
  });
  

  it("Deve retornar erro ao criar usuario por data de nascimento no futuro", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidBirthDateFuture )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da data de nascimento no futuro");
    } catch(error) {
      expect(error.response.data.error).to.equal("DateBirthdayFutureError")
      expect(error.response.data.message).to.equal("Data de nascimento não pode ser no futuro!")
      expect(error.response.data.code).to.equal(422)
    }
  });

  it("Deve retornar erro ao criar usuario por data de nascimento muito antiga", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", userInvalidOldBirthDate )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa da data de nascimento muito antiga");
    } catch(error) {
      expect(error.response.data.error).to.equal("MaximumAgeError")
      expect(error.response.data.message).to.equal(`A idade máxima permitida é de ${MAX_AGE} anos!`)
      expect(error.response.data.code).to.equal(400)
    }
  });

  it("Deve retornar erro ao criar usuario pois ja existe usuario com este email", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", validUser )
      await axios.post("http://localhost:3030/user/create", { 
        ...validUser,
        cpf: "987.654.321-00",
      } )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa de email duplicado");
    } catch(error) {
      expect(error.response.data.error).to.equal("UserAlreadyExistsError")
      expect(error.response.data.message).to.equal("Já existe usuário cadastrado com este email!")
      expect(error.response.data.code).to.equal(409)
    }
  });

  it("Deve retornar erro ao criar usuario pois ja existe usuario com este email", async () => {
    try {
      await axios.post("http://localhost:3030/user/create", validUser )
      await axios.post("http://localhost:3030/user/create", { 
        ...validUser,
        email: "example@gmail.com",
      } )
      assert.fail("Erro esperado não ocorreu, deveria ter caído no catch por causa de cpf duplicado");
    } catch(error) {
      expect(error.response.data.error).to.equal("UserAlreadyExistsError")
      expect(error.response.data.message).to.equal("Já existe usuário cadastrado com este CPF!")
      expect(error.response.data.code).to.equal(409)
    }
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
