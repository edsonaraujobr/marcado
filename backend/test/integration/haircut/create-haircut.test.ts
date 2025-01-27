import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { haircutData } from "../../utils/haircut-data.util.js";
import { createHaircutInDatabase } from "../../helpers/haircut.helper.js";
import { createBarberInDatabase } from "../../helpers/barber.helper.js";
import { barberData } from "../../utils/barber-data.util.js";

describe("Teste de criacao de corte de cabelo", async () => {
  const { validHaircut } = haircutData;
  const { validBarber } = barberData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve criar um corte de cabelo", async () => {
    const barber = await createBarberInDatabase(validBarber)

    const objectHaircut = {
      ...validHaircut,
      barberId: barber.id
    }
    const haircut = await createHaircutInDatabase(objectHaircut);
    
    expect(haircut).to.be.an("object");
    expect(haircut).to.have.property("id");
    expect(haircut.barberId).to.equal(objectHaircut.barberId);
    expect(haircut.name).to.equal(objectHaircut.name);
    expect(haircut.price).to.equal(objectHaircut.price);
    expect(haircut.time).to.equal(objectHaircut.time);
    expect(haircut.type).to.equal(objectHaircut.type);
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
