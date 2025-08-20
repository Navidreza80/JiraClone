import ReusableTable from "@/components/common/Table";
import ProjectUrl from "@/components/ProjectUrl";
import Search from "@/components/svg/Search";
import { getProjects } from "@/lib/actions/projects.action";
import formatDate from "@/lib/helper/convert-date";
import { MoreHorizontal } from "lucide-react";

const columns = [
  { title: "Name", key: "name" },
  { title: "Created At", key: "createdAt" },
  { title: "Type", key: "description" },
  { title: "Lead", key: "lead" },
  { title: "Project URL", key: "url" },
];

const Projects = async () => {
  const rawData = await getProjects();
  console.log(rawData);
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
        Projects <button className="button gap-2">Create project</button>
      </h1>
      <div className="px-2 py-2 items-center flex border border-foreground/80 rounded">
        <Search />
        <input
          type="text"
          className="outline-none focus:outline-0 text-sm font-normal px-1.5"
          placeholder="Search projects"
        />
      </div>
      <div className="py-4 w-full">
        <ReusableTable columns={columns} data={data} />
      </div>
    </div>
  );
};
export default Projects;
