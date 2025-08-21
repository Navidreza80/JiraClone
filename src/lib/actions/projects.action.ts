"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient, Project } from "../../../prisma/src/generated/prisma";
import { getServerCookie } from "../helper/server-cookie";
import { checkIsAdmin } from "./workspaceMember.action";
import { getWorkspaceById } from "./workspaces.action";

const prisma = new PrismaClient();

const getCachedProjects = unstable_cache(
  async (workspaceId: string, search?: string) => {
    try {
      return await prisma.project.findMany({
        where: {
          workspaceId,
          ...(search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        include: { Workspace: { include: { users: true } } },
      });
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

export async function getProjects(search?: string) {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  const existingWorkspace = await getWorkspaceById(workspaceId);
  if (!existingWorkspace) redirect("/select-workspace");
  return getCachedProjects(workspaceId, search);
}

export async function createProject(data: {
  name: string;
  description?: string;
  workspaceId: string;
}) {
  try {
    await prisma.project.create({
      data: { ...data },
    });
    revalidateTag("projects");
    redirect("/");
  } catch (error) {
    throw error;
  }
}

type ProjectWithoutTimestamps = Omit<Project, "createdAt" | "updatedAt">;

export async function updateProject(data: ProjectWithoutTimestamps) {
  try {
    const isAdmin = await checkIsAdmin(data.workspaceId);
    if (!isAdmin)
      return { message: "You cannot access to this workspace", success: false };
    const project = prisma.project.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
    revalidateTag("projects");
    return { data: project, success: true };
  } catch (error) {
    return { message: error, success: false };
  }
}

export async function deleteProject(id: string, workspaceId: string) {
  try {
    const isAdmin = await checkIsAdmin(workspaceId);
    if (!isAdmin)
      return { message: "You cannot access to this workspace", success: false };
    const project = prisma.project.delete({
      where: { id: id },
    });
    revalidateTag("projects");
    return { data: project, success: true };
  } catch (error) {
    return { message: error, success: false };
  }
}
