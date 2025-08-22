"use server";

import { revalidatePath } from "next/cache";
import {
  Priority,
  PrismaClient,
  task,
} from "../../../prisma/src/generated/prisma";
import { parseDate, utcDayRange } from "../helper/convert-date";

const prisma = new PrismaClient();

export async function getTasks(
  projectId: string,
  search?: string,
  dueDate?: Date,
  priority?: Priority,
  status?: task
) {
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
        ...(status && {
          status,
        }),
        ...(dueDate && {
          dueDate: dateFilter,
        }),
        ...(priority && {
          priority,
        }),
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
}

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
    revalidatePath(`/projects/${id}`);
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    });
    return { success: true, message: "Task deleted successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to delete task." };
  } finally {
    revalidatePath(`/projects/${id}`);
  }
}
