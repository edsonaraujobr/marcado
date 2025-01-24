import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { userData } from "../../utils/user-data.util.js";
import { createUserInDatabase } from "../../helpers/user.helper.js";

describe("Teste de criacao de usuario", async () => {
  const { validUser, userWithoutOptionalFields } = userData;

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

  it("Deve retornar erro ao criar dois usuarios com mesmo cpf", async () => {
    const user = await createUserInDatabase({
      ...validUser,
      email: "teste@gmail.com"
    });
    try {
      const user2 = await createUserInDatabase(validUser);
      expect.fail("O erro de criação de cpf duplo não foi lançado");
    } catch (error) {
      expect(error).to.have.property("message").that.includes("Unique constraint failed on the fields: (`cpf`)");
    }
  });

  it("Deve retornar erro ao criar dois usuarios com mesmo email", async () => {
    const user = await createUserInDatabase({
      ...validUser,
      cpf: "1010101010"
    });
    try {
      const user2 = await createUserInDatabase(validUser);
      expect.fail("O erro de criação de email duplo não foi lançado");
    } catch (error) {
      expect(error).to.have.property("message").that.includes("Unique constraint failed on the fields: (`email`)");
    }
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
