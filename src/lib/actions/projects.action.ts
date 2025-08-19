"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getServerCookie } from "../helper/server-cookie";
import { getWorkspaceById } from "./workspaces.action";

const prisma = new PrismaClient();

const getCachedProjects = unstable_cache(
  async (workspaceId: string) => {
    try {
      return await prisma.project.findMany({ where: { workspaceId } });
    } catch (error) {
      throw error;
    }
  },
  ["projects"],
  {
    tags: ["projects"],
    revalidate: 300,
  }
);

export async function getProjects() {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  const existingWorkspace = await getWorkspaceById(workspaceId);
  if (!existingWorkspace) redirect("/select-workspace");
  return getCachedProjects(workspaceId);
}

export async function createProject(data: {
  name: string;
  description?: string;
  workspaceId: string;
}) {
  try {
    await prisma.project.create({ data: { ...data } });
    revalidateTag("projects");
    redirect("/");
  } catch (error) {
    throw error;
  }
}
