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
import { deleteTask } from "@/lib/actions/task.action";
import { FileWarning } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";

export function DeleteTaskDialog({ taskId }: { taskId: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteTask(taskId);
      if (res.success) toast.success("Task deleted successfully.");
      toast.error(res.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="py-2 px-4 hover:bg-muted transition-all duration-100 cursor-pointer w-full whitespace-nowrap">
          Delete task
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <FileWarning className="h-5 w-5 text-red-500" />
            <DialogTitle>Delete task</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
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
