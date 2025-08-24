"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import {
  Priority,
  PrismaClient,
  task,
} from "../../../prisma/src/generated/prisma";
import { parseDate, utcDayRange } from "../helper/convert-date";
import { unstable_cache } from "next/cache";
import { assignTask } from "./taskAssignment.action";

const prisma = new PrismaClient();

export const getTasks = unstable_cache(
  async (
    projectId: string,
    search?: string,
    dueDate?: Date,
    priority?: Priority,
    status?: task
  ) => {
    const parsed = parseDate(dueDate);
    const dateFilter = parsed
      ? (() => {
          const { start, end } = utcDayRange(parsed);
          return { gte: start, lt: end };
        })()
      : undefined;

    try {
      return prisma.task.findMany({
        where: {
          ...(status && { status }),
          ...(dueDate && { dueDate: dateFilter }),
          ...(priority && { priority }),
          ...(search && {
            OR: [
              {
                assignment: {
                  some: {
                    profiles: {
                      username: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
                },
              },
              {
                description: { contains: search, mode: "insensitive" },
              },
              { title: { contains: search, mode: "insensitive" } },
            ],
          }),
          projectId,
        },
        include: { assignment: { select: { profiles: true } } },
      });
    } catch (error) {
      throw error;
    }
  },
  ["getTasks"],
  {
    revalidate: 60,
    tags: ["tasks"],
  }
);

export async function updateTask(
  id: string,
  data: {
    title: string;
    description?: string;
    status: "todo" | "in_progress" | "done" | "idea" | "in_review";
    priority: "HIGH" | "MEDIUM" | "LOW";
    dueDate: Date;
  }
) {
  try {
    return prisma.task.update({
      where: { id },
      data,
    });
  } catch (error) {
    throw error;
  } finally {
    revalidateTag("tasks")
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    });
    return { success: true, message: "Task deleted successfully!" };
  } catch {
    return { success: false, message: "Failed to delete task." };
  } finally {
    revalidateTag("tasks")
  }
}

export async function createTask(data: {
  title: string;
  description?: string;
  projectId: string;
  priority: Priority;
  dueDate: Date;
  status: task;
  assignment?: string[];
}) {
  try {
    const { id } = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        projectId: data.projectId,
        status: data.status,
      },
    });
    
    if (data.assignment) {
      await Promise.all(data.assignment.map((item) => assignTask(id, item)));
    }

    revalidateTag("tasks");
    return { success: true, message: "Task created successfully!" };
  } catch {
    return { success: false, message: "Failed to create task." };
  }
}
