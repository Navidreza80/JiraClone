"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface Avatar {
  username: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <Tooltip key={index}>
          <TooltipTrigger>
            <div className="h-10 w-10 rounded-full border-2 bg-button text-white text-lg font-bold flex items-center justify-center">
              {url.username.slice(0, 1).toUpperCase() || "U"}
            </div>
          </TooltipTrigger>
          <TooltipContent>{url.username || "Username"}</TooltipContent>
        </Tooltip>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
