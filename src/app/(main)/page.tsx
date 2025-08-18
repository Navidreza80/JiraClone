"use server";

import { getWorkspaces } from "@/lib/actions/workspaces.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const workspaces = await getWorkspaces();
  if (!workspaces || workspaces.length > 0) redirect("/for-you");
  else redirect("/create-workspace");
};
export default Page;
