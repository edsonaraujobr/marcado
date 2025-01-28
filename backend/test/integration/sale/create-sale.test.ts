import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { createHaircutAsCombo, createHaircutAsSale, createHaircutInDatabase } from "../../helpers/haircut.helper.js";
import { barberData } from "../../utils/barber-data.util.js";
import { createBarberInDatabase } from "../../helpers/barber.helper.js";
import { saleData } from "../../utils/sale-data.util.js";
import { createSaleInDatabase } from "../../helpers/sale.helper.js";

describe("Teste de criacao de promocao", async () => {
  const { validSale, validSaleWithoutDescription } = saleData;
  const { validBarber } = barberData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve criar uma promocao no BD com sucesso", async () => {
    const barber = await createBarberInDatabase(validBarber);
    const sale = await createSaleInDatabase(validSale);

    const haircut = await createHaircutAsSale({
      ...validSale,
      barberId: barber.id,
      saleId: sale.id,
    });

    expect(sale.description).to.equal(validSale.description);
    expect(sale.newPrice).to.equal(validSale.newPrice);
    expect(sale.isActive).to.equal(validSale.isActive);
    expect(sale.expiresIn).to.equal(validSale.expiresIn);
    expect(sale).to.have.property("id");

    expect(haircut).to.be.an("object");
    expect(haircut).to.have.property("id");
    expect(haircut.barberId).to.equal(barber.id);
    expect(haircut.saleId).to.equal(sale.id);
    expect(haircut.type).to.equal("PROMOCAO");
    expect(haircut.price).to.equal(validSale.price);
    expect(haircut.time).to.equal(validSale.time);
    expect(haircut.name).to.equal(validSale.name);
  });

  it("Deve criar uma promocao no BD sem os campos opcionais", async () => {
    const barber = await createBarberInDatabase(validBarber);
    const sale = await createSaleInDatabase(validSaleWithoutDescription);

    const haircut = await createHaircutAsSale({
      ...validSaleWithoutDescription,
      barberId: barber.id,
      saleId: sale.id,
    });
    console.log(sale.expiresIn)
    expect(sale.newPrice).to.equal(validSale.newPrice);
    expect(sale.isActive).to.equal(validSale.isActive);
    expect(sale.expiresIn).to.be.null;
    expect(sale.description).to.be.null;
    expect(sale).to.have.property("id");

    expect(haircut).to.be.an("object");
    expect(haircut).to.have.property("id");
    expect(haircut.barberId).to.equal(barber.id);
    expect(haircut.saleId).to.equal(sale.id);
    expect(haircut.type).to.equal("PROMOCAO");
    expect(haircut.price).to.equal(validSale.price);
    expect(haircut.time).to.equal(validSale.time);
    expect(haircut.name).to.equal(validSale.name);
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
