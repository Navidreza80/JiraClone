"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import { updateTask } from "@/lib/actions/task.action";
import { format } from "date-fns";
import { Task } from "../../../../../../prisma/src/generated/prisma";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done", "idea", "in_review"]),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  dueDate: z.date(),
});

type FormData = z.infer<typeof schema>;

function EditTaskForm({ task }: { task: Task }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    },
  });

  const onSubmit = async (data: FormData) => {
    await updateTask(task.id, data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg"
    >
      {/* Title */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input {...form.register("title")} />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea rows={3} {...form.register("description")} />
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium">Status</label>
        <Select
          value={form.watch("status")}
          onValueChange={(
            v: "todo" | "in_progress" | "done" | "idea" | "in_review"
          ) => form.setValue("status", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">todo</SelectItem>
            <SelectItem value="in_progress">in_progress</SelectItem>
            <SelectItem value="done">done</SelectItem>
            <SelectItem value="idea">idea</SelectItem>
            <SelectItem value="in_review">in_review</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-medium">Priority</label>
        <Select
          value={form.watch("priority")}
          onValueChange={(v: "HIGH" | "MEDIUM" | "LOW") =>
            form.setValue("priority", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HIGH">HIGH</SelectItem>
            <SelectItem value="MEDIUM">MEDIUM</SelectItem>
            <SelectItem value="LOW">LOW</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Due Date */}
      <div>
        <label className="text-sm font-medium">Due Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {form.watch("dueDate")
                ? format(form.watch("dueDate"), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={form.watch("dueDate")}
              onSelect={(d) => d && form.setValue("dueDate", d)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <button type="submit" className="w-full button">
        Save Changes
      </button>
    </form>
  );
}

export default EditTaskForm;
