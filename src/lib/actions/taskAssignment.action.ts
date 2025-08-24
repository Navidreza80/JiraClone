import { PrismaClient } from "../../../prisma/src/generated/prisma";

const prisma = new PrismaClient();
export async function assignTask(taskId: string, userId: string) {
  try {
    await prisma.taskAssignment.create({
      data: {
        taskId,
        userId,
      },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}
