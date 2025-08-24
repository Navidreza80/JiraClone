import {
  profiles,
  Task,
  TaskAssignment,
} from "../../prisma/src/generated/prisma";

export type KanbanStatus =
  | "IDEA"
  | "TO_DO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

interface AssignmentType extends TaskAssignment {
  profiles: profiles;
}

export interface KanTaskType extends Task {
  assignment: AssignmentType[];
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
