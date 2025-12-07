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
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronDown,
  Code,
  Ellipsis,
  House,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const items = [
  { title: "Project 1", url: "project", icon: Code },
  { title: "Project 2", url: "project", icon: Code },
  { title: "Project 3", url: "project", icon: Code },
];

export function AppSidebar() {
  const router = useRouter();
  const routeTo = (route: string) => {
    router.push(route);
  };

  return (
    <Sidebar>
      {/* AQUI: layout flex para separar o topo e o rodapé */}
      <SidebarContent className="flex flex-col h-full justify-between">
        {/* ------------------------- */}
        {/*      MENU SUPERIOR        */}
        {/* ------------------------- */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* PROFILE */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => {
                      routeTo("/");
                    }}
                    className="flex items-center gap-2"
                  >
                    <House className="size-4" />
                    <span>Home</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* PROJECTS */}
              <Collapsible defaultOpen className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    Projetos
                    <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {items.map((item, i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuButton asChild>
                          <a
                            href={item.url}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ------------------------- */}
        {/*      USUÁRIO EM BAIXO     */}
        {/* ------------------------- */}
        <div className="p-1">
          <DropdownMenu>
            <DropdownMenuTrigger className=" pr-5 pl-5 pt-6 pb-6 " asChild>
              <SidebarMenuButton className="flex items-center gap-3">
                <Image
                  width={0}
                  height={0}
                  src="https://github.com/shadcn.png"
                  alt="avatar"
                  className="h-9 w-9 rounded-full"
                />

                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">shadcn</span>
                  <span className="text-xs text-muted-foreground">
                    m@example.com
                  </span>
                </div>

                <Ellipsis className="ml-auto h-4 w-4 opacity-70" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="end"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <div className="w-full flex flex-row justify-between items-center">
                  Settings <Settings />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="text-red-500 w-full flex flex-row justify-between items-center">
                  Sign out <LogOut className="text-red-500" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
