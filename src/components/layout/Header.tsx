import { getUser } from "@/lib/actions/getUser.action";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Plus, Search } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import Logo from "../Logo";
import { SearchForm } from "../search-form";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import UserMenuItems from "../UserMenuItems";

const Header = async () => {
  const user = await getUser();
  const email = user?.email;

  return (
    <header className="bg-background fixed z-10 top-0 flex h-12 inset-0 items-center gap-2 border-b px-4 justify-between w-full">
      <div className="flex gap-2 items-center">
        <SidebarTrigger />
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded">
          <svg
            fill="none"
            viewBox="0 0 16 16"
            role="presentation"
            className="w-4 h-4"
          >
            <path
              fill="currentcolor"
              fillRule="evenodd"
              d="M1 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM9 3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM1 11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm6 .5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm2-.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
        <span className="pl-2">
          <Logo />
        </span>
        <span className="md:hidden border rounded h-8 w-8 flex items-center justify-center">
          <Search className="size-4 opacity-50 select-none" />
        </span>
      </div>

      <SearchForm />

      <div className="flex gap-2 h-8 items-center">
        <button className="h-full button gap-2">{<Plus size={23} />} Create</button>
        <Popover>
          <PopoverTrigger>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <UserAvatar
                    className="text-[11px] size-6"
                    email={email || ""}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{email}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[353px] shadow-lg p-2 rounded">
            <div className="flex items-start flex-wrap gap-y-1">
              <div className="bg-muted rounded flex items-center flex-grow p-4">
                <UserAvatar
                  email={email || ""}
                  className="size-16 text-3xl font-bold"
                />
                <div className="flex flex-col gap-y-1 pl-2">
                  <span className="font-semibold text-xl max-w-[200px] text-ellipsis overflow-hidden">
                    {email?.replace("@gmail.com", "").toUpperCase()}
                  </span>
                  <span className="text-muted-foreground text-[13px]">
                    {email}
                  </span>
                </div>
              </div>
              <UserMenuItems />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};
export default Header;
