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

import { UserDTO, UserService } from "@/services/UserService";
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
import { useEffect, useState } from "react";

const userService = new UserService();

export function AppSidebar() {
  const router = useRouter();
  const [user, setUser] = useState<UserDTO | null>();

  useEffect(() => {
    async function fetchUser() {
      const data = await userService.getUserData();
      setUser(data);
    }
    fetchUser();
  }, []);

  const routeTo = (route: string) => router.push(route);

  const GoToProject = (route: string) => {
    router.push("/project/" + route);
  };
  return (
    <Sidebar className="w-80 border-r">
      {/* SidebarContent como um container flex de altura total */}
      <SidebarContent className="flex flex-col h-full">
        {/* MENU SUPERIOR: Ocupa o espaço disponível (flex-1) */}
        <SidebarGroup className="flex-1 flex flex-col overflow-hidden">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          {/* Área de conteúdo que permite rolagem interna se houver muitos projetos */}
          <SidebarGroupContent className="flex-1 overflow-y-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => routeTo("/")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <House className="size-4" />
                    <span>Home</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex justify-between items-center">
                    <span>Projetos</span>
                    <ChevronDown className="ml-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {user?.Projects?.map((project, i) => (
                      <SidebarMenuItem
                        key={i}
                        onClick={() => GoToProject(project.Name)}
                      >
                        <SidebarMenuButton asChild>
                          <div className="flex items-center gap-2">
                            <Code className="size-4" />
                            <span>{project.Name}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}

                    {user?.Projects?.length === 0 && (
                      <p className="text-xs text-muted-foreground p-2">
                        Nenhum projeto encontrado.
                      </p>
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* USUÁRIO (RODAPÉ): Fica sempre na base */}
        <div className="mt-auto border-t p-2 hover:bg-transparent active:bg-transparent">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex items-center gap-3 pr-5 pl-5 pt-6 pb-6 hover:bg-transparent active:bg-transparent">
                {user?.AvatarUrl && (
                  <Image
                    src={user.AvatarUrl}
                    width={32}
                    height={32}
                    alt="avatar"
                    className="rounded-full"
                  />
                )}

                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-sm font-medium truncate">
                    {user?.Name ?? "Carregando..."}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.Username ?? "Carregando..."}
                  </span>
                </div>

                <div className="ml-auto flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-zinc-700 cursor-pointer">
                  <Ellipsis className="size-4 opacity-70" />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <div className="w-full flex justify-between items-center">
                  Settings <Settings className="size-4" />
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={() => {
                  userService.logout();
                  router.push("/login");
                }}
              >
                <div className="w-full flex justify-between items-center">
                  Sign out <LogOut className="size-4" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
