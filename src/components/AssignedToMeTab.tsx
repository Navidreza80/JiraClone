import { getAssignedTask } from "@/lib/actions/task.action";
import { TabsContent } from "./ui/tabs";

const AssignedToMeTab = async () => {
  const assignedTask = await getAssignedTask();
  return (
    <TabsContent value="assigned" className="flex flex-col items-start w-full">
      {assignedTask?.map((item) => (
        <div
          key={item.id}
          className="w-full pl-1 pr-3 py-2 flex items-center relative hover:bg-gray-100 rounded"
        >
          <span className="bg-button w-6 h-5 text-white flex items-center justify-center text-sm">
            {item.project.name.slice(0, 1).toUpperCase()}
          </span>

          <div className="flex flex-col pl-2 justify-center">
            <span className="text-sm font-normal">{item.title}</span>
            <div className="flex gap-2 text-xs font-normal text-muted-foreground">
              {item.priority}
              <p>.</p>
              {item.project.name}
            </div>
          </div>

          <span className="absolute text-xs font-normal text-muted-foreground right-6">
            {item.status}
          </span>
        </div>
      ))}
    </TabsContent>
  );
};
export default AssignedToMeTab;
