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
