"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "./SVGs/User";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const data = {
  navMain: [
    {
      title: "For you",
      url: "/",
      icon: <User />,
      items: null,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: <User />,
      items: [
        {
          title: "More projects",
          url: "/projects",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarContent className="gap-0 mt-12 p-2">
        {data.navMain.map((item) =>
          !item.items ? (
            <Link href={item.url} key={item.title}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={`py-2 px-0 text-foreground ${
                      pathname === item.url
                        ? "bg-button/10 text-button hover:bg-button/25 hover:text-button"
                        : ""
                    }`}
                    asChild
                  >
                    <div className="w-full flex items-center gap-2 cursor-pointer">
                      <span
                        className={`h-[12px] w-[2px] ${
                          pathname === item.url ? "bg-button" : "bg-transparent"
                        }`}
                      ></span>
                      {item.icon}
                      <span className="font-semibold">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </Link>
          ) : (
            <Collapsible
              key={item.title}
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger>
                    {item.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname == "projects" ? true : false}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
