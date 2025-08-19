"use server";

import { redirect } from "next/navigation";
import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { setServerCookie } from "../helper/server-cookie";
import { getUser } from "./getUser.action";

const prisma = new PrismaClient();

export async function getWorkspaces() {
  const user = await getUser();
  try {
    return prisma.workspace.findMany({ where: { userId: user?.id } });
  } catch (error) {
    throw error;
  }
}

export async function getWorkspaceById(id: string) {
  try {
    return prisma.workspace.findUnique({ where: { id } });
  } catch (error) {
    throw error;
  }
}

export async function createWorkspace(data: {
  description: string;
  name: string;
}) {
  const user = await getUser();
  if (!user) return;
  try {
    const workspace = await prisma.workspace.create({
      data: { ...data, userId: user?.id },
    });
    await setServerCookie("workspaceId", workspace.id);
    redirect(`/`);
  } catch (error) {
    throw error;
  }
}
