import { MoreHorizontal } from "lucide-react";
import { Project } from "../../prisma/src/generated/prisma";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { EditProjectDialog } from "./EditProject";

const ProjectUrl = ({ project }: { project: Project }) => {
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
        <EditProjectDialog project={project} />
        <p className="py-2">Delete project</p>
      </PopoverContent>
    </Popover>
  );
};
export default ProjectUrl;
