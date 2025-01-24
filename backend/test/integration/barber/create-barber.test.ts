import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { barberData } from "../../utils/barber-data.util.js";
import { createBarberInDatabase } from "../../helpers/barber.helper.js";

describe("Teste de criacao de barbeiro", async () => {
  const { validBarber, barberWithoutOptionalFields } = barberData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve criar um barbeiro com todas as informacoes no banco de dados", async () => {
    const barber = await createBarberInDatabase(validBarber);
    
    expect(barber).to.be.an("object");
    expect(barber).to.have.property("id");
    expect(barber.cpf).to.equal(validBarber.cpf);
    expect(barber.email).to.equal(validBarber.email);
    expect(barber.gender).to.equal(validBarber.gender);
    expect(barber.birthDate).to.equal(validBarber.birthDate);
    expect(barber.photo).to.equal(validBarber.photo);
    expect(barber.password).to.equal(validBarber.password);
    expect(barber.name).to.equal(validBarber.name);
  });

  it("Deve criar um barbeiro sem os campos opcionais no banco de dados", async () => {
    const barber = await createBarberInDatabase(barberWithoutOptionalFields);
    
    expect(barber).to.be.an("object");
    expect(barber).to.have.property("id");
    expect(barber.cpf).to.equal(barberWithoutOptionalFields.cpf);
    expect(barber.email).to.equal(barberWithoutOptionalFields.email);
    expect(barber.gender).to.be.null;
    expect(barber.birthDate).to.be.null;
    expect(barber.photo).to.be.null;
    expect(barber.password).to.equal(barberWithoutOptionalFields.password);
    expect(barber.name).to.equal(barberWithoutOptionalFields.name);
  });

  it("Deve retornar erro ao criar dois barbeiro com mesmo cpf", async () => {
    await createBarberInDatabase({
      ...validBarber,
      email: "teste@gmail.com"
    });
    try {
      await createBarberInDatabase(validBarber);
      expect.fail("O erro de criação de cpf duplo não foi lançado");
    } catch (error) {
      expect(error).to.have.property("message").that.includes("Unique constraint failed on the fields: (`cpf`)");
    }
  });

  it("Deve retornar erro ao criar dois barbeiro com mesmo email", async () => {
    await createBarberInDatabase({
      ...validBarber,
      cpf: "1010101010"
    });
    try {
      await createBarberInDatabase(validBarber);
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
