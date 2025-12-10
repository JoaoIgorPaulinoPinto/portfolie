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

      console.log(data);
      console.log("mensagem", data);
    }
    fetchUser();
  }, []);

  const routeTo = (route: string) => router.push(route);

  return (
    <Sidebar>
      <SidebarContent className=" flex flex-col h-full justify-between">
        {/* MENU SUPERIOR */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => routeTo("/")}
                    className="flex items-center gap-2"
                  >
                    <House className="size-4" />
                    <span>Home</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    Projetos
                    <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {user?.projects?.map((project) => (
                      <SidebarMenuItem key={project.id}>
                        <SidebarMenuButton asChild>
                          <a
                            href={project.url}
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            <Code className="size-4" />
                            <span>{project.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}

                    {/* Se não tiver projetos ainda */}
                    {user?.projects?.length === 0 && (
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

        {/* USUÁRIO (RODAPÉ) */}
        <div className="p-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="flex items-center gap-3 pr-5 pl-5 pt-6 pb-6">
                {user && (
                  <Image
                    src={user.avatar_url}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full"
                  />
                )}

                <div className="flex flex-col text-left">
                  <span className="text-[12px] font-medium">
                    {user?.nome ?? "Carregando..."}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {user?.login ?? "Carregando..."}
                  </span>
                </div>

                <Ellipsis className="ml-auto h-4 w-4 opacity-70" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem>
                <div className="w-full flex justify-between items-center">
                  Settings <Settings />
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  userService.logout();
                  router.push("/login");
                }}
              >
                <div className="text-red-500 w-full flex justify-between items-center">
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
