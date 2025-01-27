import { HaircutType } from "@prisma/client";

export const haircutData = {
  validHaircut: {
    name: "Corte adulto",
    price: 40,
    time: 1,
    type: HaircutType.NORMAL,
  },
};
