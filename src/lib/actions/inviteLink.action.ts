import { PrismaClient } from "../../../prisma/src/generated/prisma";
import { getServerCookie } from "../helper/server-cookie";
import { getUser } from "./getUser.action";
import { checkIsAdmin } from "./workspaceMember.action";

const prisma = new PrismaClient();

export async function createInviteLink() {
  try {
    const user = await getUser();
    if (!user) return { message: "User not found." };
    const workspaceId = await getServerCookie("workspaceId");
    if (!workspaceId) return { message: "Workspace not found." };
    const isAdmin = await checkIsAdmin();
    if (!isAdmin)
      return { message: "You don't have permission to invite a member." };
    const existingLink = await prisma.inviteLink.findUnique({
      where: { workspaceId, userId: user.id },
    });
    if (existingLink)
      return {
        link: existingLink,
        message: "Invite link created successfully!",
      };
    const data = await prisma.inviteLink.create({
      data: { workspaceId, userId: user.id },
    });
    return { link: data, message: "Invite link created successfully!" };
  } catch {
    return { message: "Failed to create invite link." };
  }
}
