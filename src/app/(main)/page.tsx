"use server";

import AssignedToMeTab from "@/components/AssignedToMeTab";
import ProjectCard from "@/components/common/ProjectCard";
import { EmptyProjects } from "@/components/NoProjects";
import StarredTab from "@/components/StarredTab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjects } from "@/lib/actions/projects.action";

export default async function Page() {
  const projects = await getProjects();
  if (!projects || !(projects.length > 0)) return <EmptyProjects />;
  return (
    <div className="flex flex-1 flex-wrap">
      <h1 className="w-full text-2xl font-semibold text-foreground leading-0 pb-12 border-b">
        For you
      </h1>
      <div className="py-4 flex justify-between items-center w-full">
        <span className="text-sm font-semibold">Recent projects</span>
        <span className="text-sm text-blue-500 hover:underline cursor-pointer">
          View all projects
        </span>
      </div>
      <div className="flex gap-4 w-full flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="w-full mt-4">
        <Tabs defaultValue="assigned" className="w-full relative">
          <TabsList className="bg-transparent p-0 space-x-4">
            <TabsTrigger
              value="assigned"
              className="data-[state=active]:shadow-none cursor-pointer data-[state=active]:border-button data-[state=active]:text-button text-gray-600 p-0 font-semibold hover:border-gray-300 rounded-none border-b-3 border-transparent border-r-0 border-l-0 border-t-0 h-[40px]"
            >
              Assigned to me
            </TabsTrigger>
            <TabsTrigger
              value="starred"
              className="data-[state=active]:shadow-none cursor-pointer data-[state=active]:border-button data-[state=active]:text-button text-gray-600 p-0 font-semibold hover:border-gray-300 rounded-none border-b-3 border-transparent border-r-0 border-l-0 border-t-0 h-[40px]"
            >
              Starred
            </TabsTrigger>
          </TabsList>
          <div className="w-full absolute border top-[37px]" />
          <AssignedToMeTab />
          <StarredTab />
        </Tabs>
      </div>
    </div>
  );
}
