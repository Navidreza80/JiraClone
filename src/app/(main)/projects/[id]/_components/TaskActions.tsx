/* eslint-disable */

"use server";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoreHorizontal } from "lucide-react";
import { EditTaskDialog } from "./EditDialog";
import { DeleteTaskDialog } from "./DeleteTask";

const TaskActions = async ({ task }: { task: any }) => {
  return (
    <Popover>
      <PopoverTrigger className="w-6 h-6 aspect-square rounded hover:bg-muted flex items-center justify-center">
        <div>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer" asChild>
              <MoreHorizontal size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>More Actions</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[139px] text-sm rounded p-0">
        <EditTaskDialog task={task} />
        <DeleteTaskDialog taskId={task.id} />
      </PopoverContent>
    </Popover>
  );
};
export default TaskActions;
