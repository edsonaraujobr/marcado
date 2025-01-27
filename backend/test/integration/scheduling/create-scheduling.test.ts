import { expect } from "chai";
import { connectDB, clearDB } from "../../helpers/db.helper.js";
import { haircutData } from "../../utils/haircut-data.util.js";
import { createHaircutInDatabase } from "../../helpers/haircut.helper.js";
import { createBarberInDatabase } from "../../helpers/barber.helper.js";
import { barberData } from "../../utils/barber-data.util.js";
import { userData } from "../../utils/user-data.util.js";
import { createUserInDatabase } from "../../helpers/user.helper.js";
import { createSchedulingInDatabase } from "../../helpers/scheduling.helper.js";
import { schedulingData } from "../../utils/scheduling-data.util.js";

describe("Teste de criacao de marcacao de horario", async () => {
  const { validHaircut } = haircutData;
  const { validBarber } = barberData;
  const { validUser } = userData;
  const { validScheduling } = schedulingData;

  before(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("Deve agendar um horario com sucesso", async () => {
    const barber = await createBarberInDatabase(validBarber)
    const user = await createUserInDatabase(validUser);

    const objectHaircut = {
      ...validHaircut,
      barberId: barber.id
    }
    const haircut = await createHaircutInDatabase(objectHaircut);

    const newScheduling = {
      ...validScheduling,
      barberId: barber.id,
      userId: user.id,
      haircutId: haircut.id,
    }
    const scheduling = await createSchedulingInDatabase(newScheduling);

    
    expect(haircut).to.be.an("object");
    expect(scheduling).to.have.property("id");
    expect(scheduling.barberId).to.equal(barber.id);
    expect(scheduling.userId).to.equal(user.id);
    expect(scheduling.haircutId).to.equal(haircut.id);
    expect(scheduling.date).to.equal(validScheduling.date);
  });

  after(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await clearDB();
  });
});
