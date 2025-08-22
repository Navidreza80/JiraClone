import Board from "@/components/svg/Board";
import Date from "@/components/svg/Date";
import List from "@/components/svg/List";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTasks } from "@/lib/actions/task.action";
import formatDate from "@/lib/helper/convert-date";
import TasksList from "./_components/TasksList";
import { Priority, task } from "../../../../../prisma/src/generated/prisma";
import TaskActions from "./_components/TaskActions";

const tabs = [
  { text: "List", value: "list", icon: <List /> },
  { text: "Board", value: "board", icon: <Board /> },
  { text: "Calendar", value: "calendar", icon: <Date /> },
];

interface IProps {
  searchParams?: {
    search?: string;
    status: task;
    priority: Priority;
    dueDate: Date;
  };
  params: {
    id: string;
  };
}

const ProjectTask = async ({ params, searchParams }: IProps) => {
  const pageSearchParams = await searchParams;
  const { id } = await params;
  const rawData = await getTasks(
    id,
    pageSearchParams?.search,
    pageSearchParams?.dueDate,
    pageSearchParams?.priority,
    pageSearchParams?.status
  );
  const data = rawData.map((item) => {
    const avatarUrl = item.assignment.map((item) => ({
      username: item.profiles.username || "U",
      profileUrl: "",
    }));
    return {
      ...item,
      dueDate: formatDate(item.dueDate),
      assignee: (
        <AvatarCircles
          avatarUrls={avatarUrl}
          numPeople={item.assignment.length}
        />
      ),
      actions: <TaskActions task={item} />,
    };
  });
  return (
    <div>
      <h1 className="text-muted-foreground text-sm hover:underline cursor-pointer">
        Projects
      </h1>
      <div className="w-full flex gap-2 items-center pt-3">
        <span className="w-5 h-5 rounded bg-button text-white flex items-center justify-center">
          U
        </span>
        <p className="font-bold text-xl">My bim bam boom project</p>
      </div>
      <div className="w-full mt-4">
        <Tabs defaultValue="list" className="w-full relative">
          <TabsList className="bg-transparent p-0 space-x-4">
            {tabs.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="data-[state=active]:shadow-none cursor-pointer data-[state=active]:border-button data-[state=active]:text-button text-gray-600 p-0 font-semibold hover:border-gray-300 rounded-none border-b-3 border-transparent border-r-0 border-l-0 border-t-0 h-[40px] flex items-center gap-1s"
              >
                {item.icon} {item.text}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full absolute border top-[37px]" />
          <TasksList data={data} />
        </Tabs>
      </div>
    </div>
  );
};
export default ProjectTask;
