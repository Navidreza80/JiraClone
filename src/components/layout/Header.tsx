import { Plus, Search } from "lucide-react";
import AppButton from "../common/button";
import Logo from "../Logo";
import { SearchForm } from "../search-form";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip } from "../ui/tooltip";

const Header = async () => {
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
        <AppButton className="h-full" icon={<Plus size={23} />} />
        <Tooltip>
          <span className="hover:bg-accent p-1 flex items-center justify-center rounded-full">
            <span className="bg-button-hover text-white flex items-center justify-center h-6 w-6 cursor-pointer rounded-full text-[11px]">
              NA
            </span>
          </span>
        </Tooltip>
      </div>
    </header>
  );
};
export default Header;
