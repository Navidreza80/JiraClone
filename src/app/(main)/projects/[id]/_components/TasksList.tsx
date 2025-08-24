/* eslint-disable */

import dynamic from "next/dynamic"
import SearchTasksInput from "@/components/SearchTasks"
import { TabsContent } from "@/components/ui/tabs"

// Lazy imports
const ReusableTable = dynamic(() => import("@/components/common/Table"), {
  ssr: true,
  loading: () => <p>Loading table...</p>,
})

const FiltersPopover = dynamic(() => import("./FilterTask"), {
  ssr: true,
  loading: () => <p>Loading filters...</p>,
})

const CreateTaskDialog = dynamic(() => import("./CreateTask"), {
  ssr: true,
  loading: () => <p>Loading...</p>,
})

const columns = [
  { title: "Title", key: "title" },
  { title: "Summary", key: "description" },
  { title: "Status", key: "status" },
  { title: "Due date", key: "dueDate" },
  { title: "Priority", key: "priority" },
  { title: "Assignee", key: "assignee" },
  { title: "Actions", key: "actions" },
]

const TasksList = async ({ data }: { data: any }) => {
  return (
    <TabsContent value="list">
      <div className="w-full py-6">
        <div className="w-full flex items-center gap-2 mb-6 justify-between">
          <div className="flex w-full gap-2 items-center">
            <SearchTasksInput />
            <FiltersPopover />
          </div>
          <CreateTaskDialog />
        </div>
        <ReusableTable data={data} columns={columns} />
      </div>
    </TabsContent>
  )
}

export default TasksList
