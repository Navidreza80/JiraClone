import ReusableTable from "@/components/common/Table";
import ProjectUrl from "@/components/ProjectUrl";
import SearchProjectsInput from "@/components/SearchProjectsInput";
import { getProjects } from "@/lib/actions/projects.action";
import formatDate from "@/lib/helper/convert-date";
import Link from "next/link";

const columns = [
  { title: "Name", key: "name" },
  { title: "Created At", key: "createdAt" },
  { title: "Type", key: "description" },
  { title: "Lead", key: "lead" },
  { title: "Project URL", key: "url" },
];

interface ProjectsProps {
  searchParams?: { search?: string };
}

const Projects = async ({ searchParams }: ProjectsProps) => {
  const rawData = await getProjects(searchParams?.search || "");
  const data = rawData.map((item) => ({
    ...item,
    lead: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-button text-white flex items-center justify-center">
          {item.Workspace.users?.email?.slice(0, 2).toUpperCase()}
        </div>
        {item.Workspace.users?.email?.replace("@gmail.com", "")}
      </div>
    ),
    createdAt: formatDate(item.createdAt),
    url: <ProjectUrl project={item} />,
  }));
  return (
    <div className="flex flex-1 flex-wrap">
      <h1 className="w-full text-2xl font-semibold text-foreground leading-0 pb-8 flex justify-between items-center">
        Projects
        <Link href="create-project">
          <button className="button gap-2">Create project</button>
        </Link>
      </h1>
      <SearchProjectsInput />
      <div className="py-4 w-full">
        <ReusableTable columns={columns} data={data} />
      </div>
    </div>
  );
};
export default Projects;
