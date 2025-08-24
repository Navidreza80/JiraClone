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
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <Tooltip key={index}>
          <TooltipTrigger>
            <div className="h-6 w-6 rounded-full border-2 bg-button text-white text-[11px] font-medium flex items-center justify-center">
              {url.username.slice(0, 1).toUpperCase() || "U"}
            </div>
          </TooltipTrigger>
          <TooltipContent>{url.username || "Username"}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
