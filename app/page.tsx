"use client";

import { RatioGroupFilter } from "@/components/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ui/project-card";
import { ProjectDTO, UserService } from "@/services/UserService";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

const userService = new UserService();

export default function Home() {
  const [projects, setUserProjects] = useState<ProjectDTO[] | null>();
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userService.getUserData();
        setUserProjects(data?.projects);
        console.log(data);
        console.log("mensagem", data);
      } catch {
        redirect("/login");
      }
    }
    fetchUser();
  }, []);

  const [filter, setSelectedFilter] = useState("");
  console.log(filter);
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full flex gap-5">
        <Input
          type="text"
          placeholder="Project..."
          className="w-full bg-zinc-200"
        />
        <Button variant="ghost" className="bg-primary text-black pl-20 pr-20">
          <Search />
        </Button>
        <div>
          <RatioGroupFilter
            selected={setSelectedFilter}
            options={["C#", "TypeScript", "ASP.NET", "JavaScript", "CSS"]}
          />
        </div>
      </div>
      {projects?.map((project: ProjectDTO, i) => (
        <div key={i}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
