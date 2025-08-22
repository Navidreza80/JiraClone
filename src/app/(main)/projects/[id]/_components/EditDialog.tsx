"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import * as React from "react";
import { Task } from "../../../../../../prisma/src/generated/prisma";
import EditTaskForm from "./EditTaskForm";

export function EditTaskDialog({ task }: { task: Task }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="py-2 px-4 hover:bg-muted transition-all duration-100 cursor-pointer w-full whitespace-nowrap">
          Edit task
        </p>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update task details and save your changes.
          </DialogDescription>
        </DialogHeader>

        <EditTaskForm task={task} />
      </DialogContent>
    </Dialog>
  );
}
