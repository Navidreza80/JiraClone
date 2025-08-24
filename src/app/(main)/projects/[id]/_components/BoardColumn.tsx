import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { KanbanStatus } from "@/types/indes";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useMemo } from "react";
import { Task } from "../../../../../../prisma/src/generated/prisma";

export default function Column({
  id,
  title,
  tasks,
  filter,
}: {
  id: KanbanStatus;
  title: string;
  tasks: Task[];
  filter?: string;
}) {
  const filtered = useMemo(() => {
    if (!filter) return tasks;
    const q = filter.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
    );
  }, [filter, tasks]);

  return (
    <div className="flex flex-col gap-3 bg-muted/60 rounded p-3 min-h-[40vh] w-[270px]">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[13px] font-semibold tracking-wide text-muted-foreground gap-x-2 items-center flex">
          {title}
          <span className="text-[11px] px-[7px] bg-muted-foreground/10 rounded">
            {filtered.length}
          </span>
        </h3>
      </div>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3"
          >
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`border rounded shadow-none p-3 ${
                      snapshot.isDragging ? "opacity-60" : ""
                    }`}
                  >
                    <CardHeader className="px-2">
                      <div className="flex items-center">
                        <CardTitle className="text-sm font-normal leading-tight line-clamp-2 p-0">
                          {task.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
