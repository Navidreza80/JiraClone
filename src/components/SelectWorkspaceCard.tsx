"use client";

import { Workspace } from "../../prisma/src/generated/prisma";

const SelectWorkspaceCard = ({
  workspace,
  handleWorkspaceSelect,
}: {
  workspace: Workspace;
  handleWorkspaceSelect: (id: string) => void;
}) => {
  return (
    <div
      onClick={() => handleWorkspaceSelect(workspace.id)}
      className="p-4 rounded-lg select-none active:scale-95 transition-all duration-200 border border-border hover:border-button cursor-pointer flex items-center"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-md bg-blue-100 flex items-center justify-center mr-4">
        <span className="text-button font-medium">
          {workspace.name.charAt(0)}
        </span>
      </div>
      <div className="flex-grow">
        <h3 className="text-foreground font-semibold">{workspace.name}</h3>
        <p className="text-sm text-muted-foreground">
          {workspace.description || "no description"}
        </p>
      </div>
    </div>
  );
};
export default SelectWorkspaceCard;
