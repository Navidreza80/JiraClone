import { TabsContent } from "./ui/tabs";

const AssignedToMeTab = () => {
  return (
    <TabsContent value="assigned" className="flex flex-col items-start w-full">
      <div className="w-full pl-1 pr-3 py-2 flex items-center relative hover:bg-gray-100 rounded">
        <span className="bg-black w-6 h-5"></span>
        <div className="flex flex-col pl-2 justify-center">
          <span className="text-sm font-normal">Task 1</span>
          <div className="flex gap-2 text-xs font-normal text-muted-foreground">
            KAN-2
            <p>.</p>
            My Kanban Project
          </div>
        </div>
        <span className="absolute text-xs font-normal text-muted-foreground right-6">
          To Do
        </span>
      </div>
    </TabsContent>
  );
};
export default AssignedToMeTab;
