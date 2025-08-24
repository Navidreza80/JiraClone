import { profiles, Task } from "../../prisma/src/generated/prisma";

export type KanbanStatus =
  | "IDEA"
  | "TO_DO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

export interface KanTaskType extends Task {
  assignment: { profiles: profiles }[];
}

export interface TaskEvent {
  start: Date;
  end: Date;
  title: string;
  status: Task["status"];
  priority: Task["priority"];
  projectId: string;
  id: string;
}
