import { Workspace } from "../../../prisma/src/generated/prisma";

const ProjectCard = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="w-[240px] h-[168px] border relative rounded shadow-xs">
      <div className="absolute bg-blue-200 w-6 rounded-tl rounded-bl h-full top-0 left-0" />
      <div className="absolute flex gap-2 items-center top-5 left-3">
        <div className="w-6 h-6 bg-gray-500 rounded" />
      </div>
      <div className="flex flex-col space-y-3 pl-11 pr-4 p-3">
        <div className="flex flex-col">
          <span className="text-sm w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {workspace.name}
          </span>
          <span className="text-xs font-medium w-[100px] whitespace-nowrap text-ellipsis overflow-hidden">
            {workspace.description || "no description"}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">Quick links</span>
        <span className="text-[11px] font-medium w-full flex justify-between">
          My open work items
          <span className="bg-muted px-3 rounded-full">8</span>
        </span>
        <span className="text-[11px] font-medium w-full flex justify-between">
          Done work items
          <span className="bg-muted px-3 rounded-full">8</span>
        </span>
      </div>
    </div>
  );
};
export default ProjectCard;
