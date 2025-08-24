import { Badge } from "@/components/ui/badge";
import type {
  task,
  Priority,
} from "../../../../../../prisma/src/generated/prisma";

export default function TaskCard({
  title,
  status,
  priority,
}: {
  title: string;
  status: task;
  priority: Priority;
}) {
  return (
    <div className="rounded border p-1 bg-muted space-y-2">
      <p className="font-medium text-sm truncate">{title}</p>
      <div className="flex items-center gap-1 text-xs">
        <Badge className="bg-button">{status}</Badge>
        <Badge className="bg-button">{priority}</Badge>
      </div>
    </div>
  );
}
