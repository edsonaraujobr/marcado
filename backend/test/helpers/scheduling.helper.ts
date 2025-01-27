import { prisma } from "../../prisma/prisma.js";
import dayjs from "dayjs";

export async function createSchedulingInDatabase({
  date,
  userId,
  barberId,
  haircutId
}: {
  date: string;
  userId: string;
  barberId: string;
  haircutId: string;
}) {

  const formattedDate = dayjs(date, "DD-MM-YYYY hh:mm:ss").toISOString();

  const scheduling = await prisma.scheduling.create({
    data: {
      date: formattedDate,
      userId,
      barberId,
      haircutId
    }
  });

  return {
    ...scheduling,
    date: dayjs(scheduling.date).format("DD-MM-YYYY hh:mm:ss")
  };
}
