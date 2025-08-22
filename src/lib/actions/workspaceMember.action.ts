"use server";

import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getServerCookie } from "../helper/server-cookie";
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
        workspaceId,
        role: role,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const checkIsAdmin = async () => {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) return;
  const user = await getUser();
  if (!user) return;
  try {
    return prisma.workspaceMember.findMany({
      where: { workspaceId, role: "Admin", userId: user.id },
      select: { role: true },
    });
  } catch (error) {
    throw error;
  }
};

export const checkIsMember = async () => {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) return;
  const user = await getUser();
  if (!user) return;
  try {
    return prisma.workspaceMember.findMany({
      where: { workspaceId, userId: user.id },
    });
  } catch (error) {
    throw error;
  }
};

export const findWorkspaceMembers = async (search?: string) => {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) return;
  const isMember = await checkIsMember();
  if (!isMember) return;
  try {
    return prisma.workspaceMember.findMany({
      where: {
        workspaceId,
        ...(search
          ? {
              OR: [
                {
                  profiles: {
                    username: { contains: search, mode: "insensitive" },
                  },
                },
              ],
            }
          : {}),
      },
      include: { profiles: true },
    });
  } catch (error) {
    throw error;
  }
};
