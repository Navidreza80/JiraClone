import { TabsContent } from "./ui/tabs";

const StarredTab = () => {
  return (
    <TabsContent value="starred">
      <div className="w-full pl-1 pr-3 py-2 flex items-center relative hover:bg-gray-100 rounded">
        <span className="w-6 h-6 text-yellow-300 mx-3 cursor-pointer hover:bg-gray-200 rounded p-3 relative flex items-center justify-center">
          <svg
            fill="none"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            width="70%"
            height="70%"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentcolor"
              fillRule="evenodd"
              d="M8 0a.75.75 0 0 1 .7.48l1.705 4.434 4.403.338a.75.75 0 0 1 .422 1.324l-3.38 2.818 1.25 4.662a.75.75 0 0 1-1.148.813L8 12.159l-3.95 2.71a.75.75 0 0 1-1.15-.813l1.251-4.662L.77 6.576a.75.75 0 0 1 .422-1.324l4.403-.338L7.3.48A.75.75 0 0 1 8 0m0 2.84L6.655 6.335l-3.506.27 2.7 2.25-.973 3.627L8 10.341l3.124 2.142-.973-3.627 2.7-2.25-3.506-.27z"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentcolor"
              d="M6.655 6.336 8 2.84l1.345 3.497 3.506.27-2.7 2.25.973 3.627L8 10.341l-3.124 2.142.973-3.627-2.7-2.25z"
            ></path>
          </svg>
        </span>

        <span className="bg-black w-6 h-5"></span>
        <div className="flex flex-col pl-2 justify-center">
          <span className="text-sm font-normal">My Kanban Project</span>
          <div className="flex gap-2 text-xs font-normal text-muted-foreground">
            Team-managed software
          </div>
        </div>
        <span className="absolute text-xs font-normal text-muted-foreground right-6">
          To Do
        </span>
      </div>
    </TabsContent>
  );
};
export default StarredTab;
