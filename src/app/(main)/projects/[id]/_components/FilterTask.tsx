"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

type Status = "todo" | "in_progress" | "done" | "idea" | "in_review";
type Priority = "HIGH" | "MEDIUM" | "LOW";

function toISODateOnly(d: Date | null | undefined) {
  if (!d) return undefined;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function FiltersPopover() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // read current params (for controlled UI)
  const statusParam = (params.get("status") as Status | null) ?? undefined;
  const priorityParam =
    (params.get("priority") as Priority | null) ?? undefined;
  const dueDateParam = params.get("dueDate") ?? undefined;

  const [open, setOpen] = React.useState(false);

  function patchSearchParams(updates: Record<string, string | undefined>) {
    const sp = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") sp.delete(key);
      else sp.set(key, value);
    });

    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  function clearAll() {
    patchSearchParams({
      status: undefined,
      priority: undefined,
      dueDate: undefined,
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          {" "}
          <button className="rounded border flex items-center gap-1 h-[37.6px] p-2 text-sm font-medium cursor-pointer">
            Filter <ChevronDown size={16} />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-4 space-y-4 overflow-scroll h-[300px]">
        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={statusParam}
            onValueChange={(v: Status) => patchSearchParams({ status: v })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any status" />
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

        {/* Due date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Due date</label>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={dueDateParam ? new Date(dueDateParam) : undefined}
              onSelect={(d) =>
                patchSearchParams({ dueDate: toISODateOnly(d ?? undefined) })
              }
              ISOWeek
            />
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="h-3.5 w-3.5" />
            {dueDateParam
              ? new Date(dueDateParam).toLocaleDateString()
              : "No date selected"}
          </div>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <Select
            value={priorityParam}
            onValueChange={(v: Priority) => patchSearchParams({ priority: v })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HIGH">HIGH</SelectItem>
              <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              <SelectItem value="LOW">LOW</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-start gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={clearAll} className="bg-button text-white">
            Clear
          </Button>
          <Button size="sm" onClick={() => setOpen(false)} className="bg-button">
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
