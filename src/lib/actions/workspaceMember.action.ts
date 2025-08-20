"use server";

import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getUser } from "./getUser.action";

const prisma = new PrismaClient();

export const addMember = async (
  workspaceId: string,
  role: "ADMIN" | "COLLABORATOR"
) => {
  const user = await getUser();
  if (!user) return;
  try {
    return prisma.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: workspaceId,
        role: role,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const checkIsAdmin = async (workspaceId: string) => {
  const user = await getUser();
  if (!user) return;
  try {
    return await prisma.workspaceMember.findMany({
      where: { workspaceId, role: "Admin", userId: user.id },
      select: { role: true },
    });
  } catch (error) {
    throw error;
  }
};
