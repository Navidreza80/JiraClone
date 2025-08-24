import EmptyWorkspace from "@/components/EmptyWorkspaces";
import SelectWorkspaceCard from "@/components/SelectWorkspaceCard";
import { getWorkspaces } from "@/lib/actions/workspaces.action";
import { setServerCookie } from "@/lib/helper/server-cookie";
import { Plus } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
export async function generateMetadata() {
  return {
    title: "Select workspace",
    description: "Select your workspace to continue",
  };
}
export default async function WorkspaceSelection() {
  const workspaces = await getWorkspaces();
  const handleWorkspaceSelect = async (id: string) => {
    "use server";
    await setServerCookie("workspaceId", id);
    redirect("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Select Workspace</title>
        <meta name="description" content="Choose your workspace" />
      </Head>

      <main className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Continue to your workspace
          </h1>
          <p className="text-muted-foreground">
            Select a workspace below to get started
          </p>
        </div>

        <div className="space-y-4">
          {workspaces.map((workspace) => (
            <SelectWorkspaceCard
              key={workspace.id}
              workspace={workspace}
              handleWorkspaceSelect={handleWorkspaceSelect}
            />
          ))}
          {!(workspaces.length > 0) && <EmptyWorkspace />}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href={"/create-workspace"}>
            <button className="button gap-2">
              <Plus size={16} /> Create new workspace
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
