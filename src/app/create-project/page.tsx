"use client";

import { getWorkspaces } from "@/lib/actions/workspaces.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Workspace as WorkspaceType } from "../../../prisma/src/generated/prisma";
import { createProject } from "@/lib/actions/projects.action";

const ProjectSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name is too long" }),
  description: z
    .string()
    .max(30, { message: "Description is too long" })
    .optional(),
  workspaceId: z.string().min(1, { message: "Please select a workspace" }),
});

type ProjectFormValues = z.infer<typeof ProjectSchema>;

export default function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: { name: "", description: "", workspaceId: "" },
  });
  const [workspaces, setWorkspaces] = useState<WorkspaceType[] | null>(null);

  const onSubmit = async (values: ProjectFormValues) => {
    await createProject(values)
    reset();
  };

  const fetchWorkspaces = async () => {
    const workspaces = await getWorkspaces();
    setWorkspaces(workspaces);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="max-w-md mx-auto p-6 border border-border rounded">
          <h1 className="text-2xl font-bold mb-4">Create Project</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Project Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="My Project"
                {...register("name")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/80"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Optional description"
                {...register("description")}
                className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/80"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Workspace */}
            <div>
              <label htmlFor="workspaceId" className="block mb-1 font-medium">
                Workspace
              </label>
              <select
                id="workspaceId"
                {...register("workspaceId")}
                className="w-full rounded-md px-3 pr-5 py-2 outline-none focus:ring-2 focus:ring-button border"
              >
                <option value="">Select workspace</option>
                {workspaces?.map((workspace) => (
                  <option
                    className="rounded-md"
                    key={workspace.id}
                    value={workspace.id}
                  >
                    {workspace.name}
                  </option>
                ))}
              </select>
              {errors.workspaceId && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.workspaceId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 button w-full justify-center"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
