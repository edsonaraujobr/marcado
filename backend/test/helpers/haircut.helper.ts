import { HaircutType } from "@prisma/client";
import { prisma } from "../../prisma/prisma.js";
import { createBarberInDatabase } from "./barber.helper.js";
import { createComboInDatabase } from "./combo.helper.js";
import { barberData } from "../utils/barber-data.util.js";
import { comboData } from "../utils/combo-data.util.js";

export async function createHaircutInDatabase({
  name,
  price,
  time,
  barberId,
  type,
  comboId,
  saleId,
}: {
  name: string;
  price: number;
  time: number;
  barberId: string;
  type: HaircutType;
  comboId?: string;
  saleId?: string;
}) {


  const haircut = await prisma.haircut.create({
    data: {
      name,
      price,
      time,
      barberId,
      type,
      comboId,
      saleId,
    }
  });

  return {
    ...haircut,
    price: Number(haircut.price)
  };
}

export async function createHaircutAsCombo({
  name,
  price,
  time,
  barberId,
  comboId,
}: {
  name: string;
  price: number;
  time: number;
  barberId: string;
  comboId: string;
}) {

  const haircut = await createHaircutInDatabase({
    name,
    price,
    barberId,
    comboId,
    type: HaircutType.COMBO,
    time,
  });

  return haircut;

}

export async function createHaircutAsSale({
  name,
  price,
  time,
  barberId,
  saleId,
}: {
  name: string;
  price: number;
  time: number;
  barberId: string;
  saleId: string;
}) {

  const haircut = await createHaircutInDatabase({
    name,
    price,
    barberId,
    saleId,
    type: HaircutType.PROMOCAO,
    time,
  });

  return haircut;

}
