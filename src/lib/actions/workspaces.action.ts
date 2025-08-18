"use server";

import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getUser } from "./getUser.action";

const prisma = new PrismaClient();

export async function getWorkspaces() {
  const user = await getUser();
  if (!user) return;
  try {
    return prisma.workspace.findMany({ where: { userId: user.id } });
  } catch (error) {
    throw error;
  }
}
