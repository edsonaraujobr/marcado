import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { createHaircutAsCombo, createHaircutInDatabase } from "../../helpers/haircut.helper.js";
import { comboData } from "../../utils/combo-data.util.js";
import { createComboInDatabase } from "../../helpers/combo.helper.js";
import { barberData } from "../../utils/barber-data.util.js";
import { createBarberInDatabase } from "../../helpers/barber.helper.js";

describe("Teste de criacao de combo", async () => {
  const { validCombo } = comboData;
  const { validBarber } = barberData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve criar um combo com sucesso", async () => {
  
    const barber = await createBarberInDatabase(validBarber);
    const combo = await createComboInDatabase(validCombo);

    const haircut = await createHaircutAsCombo({
      ...validCombo,
      barberId: barber.id,
      comboId: combo.id,
    });

    expect(combo.description).to.equal(validCombo.description);
    expect(combo).to.have.property("id");

    expect(haircut).to.be.an("object");
    expect(haircut).to.have.property("id");
    expect(haircut.barberId).to.equal(barber.id);
    expect(haircut.comboId).to.equal(combo.id);
    expect(haircut.type).to.equal("COMBO");
    expect(haircut.price).to.equal(validCombo.price);
    expect(haircut.time).to.equal(validCombo.time);
    expect(haircut.name).to.equal(validCombo.name);
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
