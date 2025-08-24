import { KanbanStatus } from "@/types/indes";
import { task } from "../../prisma/src/generated/prisma";

export const API_BASE_URL = "";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer `,
  },
};

export const COLUMN_ORDER: KanbanStatus[] = [
  "IDEA",
  "TO_DO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
];

export const COLUMN_TITLES: Record<KanbanStatus, string> = {
  IDEA: "IDEA",
  TO_DO: "TO DO",
  IN_PROGRESS: "IN PROGRESS",
  IN_REVIEW: "IN REVIEW",
  DONE: "DONE",
};

export const STATUS_MAP: Record<KanbanStatus, task> = {
  IDEA: "idea",
  TO_DO: "todo",
  IN_PROGRESS: "in_progress",
  IN_REVIEW: "in_review",
  DONE: "done",
};

export const REVERSE_STATUS_MAP: Record<task, KanbanStatus> = {
  idea: "IDEA",
  todo: "TO_DO",
  in_progress: "IN_PROGRESS",
  in_review: "IN_REVIEW",
  done: "DONE",
};
