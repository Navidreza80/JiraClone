"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProject } from "@/lib/actions/projects.action";
import { FileWarning } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export function DeleteProjectDialog({ projectId }: { projectId: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteProject(projectId);
      if (res.success) toast.success("Project deleted successfully.");
      toast.error(res.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="py-2 px-4 hover:bg-muted transition-all duration-100 cursor-pointer w-full whitespace-nowrap">
          Delete project
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <FileWarning className="h-5 w-5 text-red-500" />
            <DialogTitle>Delete Project</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full flex justify-start sm:justify-start">
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer rounded">
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            className="cursor-pointer rounded"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
