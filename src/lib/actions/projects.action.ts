"use server";

import { redirect } from "next/navigation";
import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getServerCookie } from "../helper/server-cookie";

const prisma = new PrismaClient();

export async function getProjects() {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  try {
    return prisma.project.findMany({ where: { workspaceId: workspaceId } });
  } catch (error) {
    throw error;
  }
}
