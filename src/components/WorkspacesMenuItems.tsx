import { getWorkspaces } from "@/lib/actions/workspaces.action";
import { setServerCookie } from "@/lib/helper/server-cookie";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import WorkspaceItem from "./WorkspaceItem";

const WorkspacesMenuItems = async () => {
  const workspaces = await getWorkspaces();
  const handleWorkspaceSelect = async (id: string) => {
    "use server";
    await setServerCookie("workspaceId", id);
    revalidatePath("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded">
                  <svg
                    fill="none"
                    viewBox="0 0 16 16"
                    role="presentation"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentcolor"
                      fillRule="evenodd"
                      d="M1 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM9 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM1 11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm6 .5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>workspaces</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[343px] shadow-lg p-2 rounded">
        <div className="flex justify-start flex-col">
          {workspaces.map((item) => (
            <WorkspaceItem
              key={item.id}
              item={item}
              handleWorkspaceSelect={handleWorkspaceSelect}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default WorkspacesMenuItems;
