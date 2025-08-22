/* eslint-disable */

import ReusableTable from "@/components/common/Table";
import SearchTasksInput from "@/components/SearchTasks";
import { TabsContent } from "@/components/ui/tabs";
import FiltersPopover from "./FilterTask";

const columns = [
  { title: "Title", key: "title" },
  { title: "Summary", key: "description" },
  { title: "Status", key: "status" },
  { title: "Due date", key: "dueDate" },
  { title: "Priority", key: "priority" },
  { title: "Assignee", key: "assignee" },
  { title: "Actions", key: "actions" },
];

const TasksList = async ({ data }: { data: any }) => {
  return (
    <TabsContent value="list">
      <div className="w-full py-6">
        <div className="w-full flex items-center gap-2 mb-6 justify-between">
          <div className="flex w-full gap-2 items-center">
            <SearchTasksInput />
            <FiltersPopover />
          </div>
          <button className="button">Create task</button>
        </div>
        <ReusableTable data={data} columns={columns} />
      </div>
    </TabsContent>
  );
};
export default TasksList;
