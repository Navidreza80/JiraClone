"use client";

import { Workspace } from "../../prisma/src/generated/prisma";

const WorkspaceItem = ({
  item,
  handleWorkspaceSelect,
  currentWorkspace,
}: {
  item: Workspace;
  handleWorkspaceSelect: (id: string) => void;
  currentWorkspace: string | null;
}) => {
  return (
    <div
      className={`w-[319px] p-2 rounded-md ${
        currentWorkspace == item.id
          ? "bg-button/10 hover:bg-button/25"
          : "hover:bg-muted"
      }  flex items-center gap-2 cursor-pointer`}
      onClick={() => handleWorkspaceSelect(item.id)}
    >
      <span className="w-8 h-8 rounded-md text-white bg-button flex items-center justify-center">
        {item.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="text-sm font-normal">{item.name}</span>
    </div>
  );
};
export default WorkspaceItem;
