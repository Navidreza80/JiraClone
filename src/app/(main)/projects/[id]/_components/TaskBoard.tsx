"use client";

import { TabsContent } from "@/components/ui/tabs";
import {
  COLUMN_ORDER,
  COLUMN_TITLES,
  REVERSE_STATUS_MAP,
  STATUS_MAP,
} from "@/constants";
import { updateTask } from "@/lib/actions/task.action";
import { KanbanStatus } from "@/types/indes";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Task } from "../../../../../../prisma/src/generated/prisma";
import Column from "./BoardColumn";

export default function KanbanBoard({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [query, setQuery] = useState("");

  const columns = useMemo(() => {
    const byCol: Record<KanbanStatus, Task[]> = {
      IDEA: [],
      TO_DO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DONE: [],
    };
    for (const t of tasks) {
      byCol[REVERSE_STATUS_MAP[t.status]].push(t);
    }
    return byCol;
  }, [tasks]);

  async function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // optimistic UI update
    setTasks((prev) => {
      const copy = Array.from(prev);
      const taskIndex = copy.findIndex((t) => t.id === result.draggableId);
      if (taskIndex === -1) return prev;

      const newStatus = destination.droppableId as KanbanStatus;
      const moved = { ...copy[taskIndex], status: STATUS_MAP[newStatus] };
      copy[taskIndex] = moved;
      return [...copy];
    });

    // persist to DB
    const kanbanStatus = destination.droppableId as KanbanStatus;
    const prismaStatus = STATUS_MAP[kanbanStatus];
    const task = tasks.find((t) => t.id === result.draggableId);

    if (!task) return;

    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description ?? undefined,
        status: prismaStatus,
        priority: task.priority,
        dueDate: task.dueDate,
      });

      toast.success(`Task moved to ${COLUMN_TITLES[kanbanStatus]}`);
    } catch {
      toast.error("Failed to update task");
    }
  }

  return (
    <TabsContent value="board">
      <div className="w-full overflow-x-scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 w-[1650px] pb-20">
            {COLUMN_ORDER.map((c) => (
              <div key={c}>
                <Column
                  id={c}
                  title={COLUMN_TITLES[c]}
                  tasks={columns[c]}
                  filter={query}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </TabsContent>
  );
}
