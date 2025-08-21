"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProject } from "@/lib/actions/projects.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Project } from "../../prisma/src/generated/prisma";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

const projectSchema = z.object({
  name: z.string().min(3, "Name is too short").max(15, "Name is too long"),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(30, "Description is too long")
    .optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface EditProjectDialogProps {
  project: Project;
}

export function EditProjectDialog({ project }: EditProjectDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description || "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    const updatedProject = await updateProject({
      ...data,
      description: data.description || null,
      id: project.id,
      workspaceId: project.workspaceId,
    });
    if (updatedProject.success) {
      toast.success("Project updated successfully!");
    } else {
      toast.error("failed to update project.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="py-2 px-4 hover:bg-muted transition-all duration-100 cursor-pointer w-full whitespace-nowrap">
          Edit project
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <Input className="shadow-none rounded" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <Textarea
              className="shadow-none rounded"
              {...register("description")}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter className="w-full flex justify-start sm:justify-start">
            <Button
              className="bg-button rounded hover:bg-button-hover cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
