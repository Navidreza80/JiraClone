import { getTasks } from "@/lib/actions/task.action";
import { Project } from "../../../prisma/src/generated/prisma";
import Link from "next/link";

const ProjectCard = async ({ project }: { project: Project }) => {
  const openTasks = await getTasks(
    project.id,
    undefined,
    undefined,
    undefined,
    "in_progress"
  );
  const doneTasks = await getTasks(
    project.id,
    undefined,
    undefined,
    undefined,
    "done"
  );
  return (
    <div className="w-[240px] h-[168px] border relative rounded shadow-xs">
      <div className="absolute bg-blue-200 w-6 rounded-tl rounded-bl h-full top-0 left-0" />
      <div className="absolute flex gap-2 items-center top-5 left-3">
        <div className="w-6 h-6 bg-button rounded text-white flex items-center justify-center">
          {project.name.slice(0, 1).toUpperCase()}
        </div>
      </div>
      <div className="flex flex-col space-y-3 pl-11 pr-4 p-3">
        <div className="flex flex-col">
          <span className="text-sm w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {project.name}
          </span>
          <span className="text-xs font-medium w-[100px] whitespace-nowrap text-ellipsis overflow-hidden">
            {project.description || "no description"}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">Quick links</span>
        <span className="text-[11px] font-medium w-full flex justify-between">
          <Link href={`/projects/${project.id}?status=in_progress`}>
            My open work items
          </Link>

          <span className="bg-muted px-3 rounded-full">
            {openTasks ? openTasks.length : 0}
          </span>
        </span>
        <span className="text-[11px] font-medium w-full flex justify-between">
          <Link href={`/projects/${project.id}?status=done`}>
            Done work items
          </Link>

          <span className="bg-muted px-3 rounded-full">
            {doneTasks ? doneTasks.length : 0}
          </span>
        </span>
      </div>
    </div>
  );
};
export default ProjectCard;
