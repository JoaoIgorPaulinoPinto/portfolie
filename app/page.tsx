"use client";

import { RatioGroupFilter } from "@/components/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDTO, UserService } from "@/services/UserService";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const userService = new UserService();

export default function Home() {
  const [user, setUser] = useState<UserDTO | null>();
  useEffect(() => {
    async function fetchUser() {
      const data = await userService.getUserData();
      setUser(data);
      console.log("USuario da home: " + data);
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
            options={["C#", "TS", "React", "Next"]}
          />
        </div>
      </div>
      <div className="rounded-md mt-5 p-5 w-full h-fit bg-zinc-900">
        <div className="text-left flex flex-col ">
          <span className="text-xl text-gray-200">Nome do projeto</span>
          <span className="text-sm italic text-gray-400">
            Aqui vai a descrição do projeto para que quem veja, saiba do que se
            trata
          </span>
          <a
            href="github.com/projetomastar"
            className="text-right text-sm text-gray-500 italic"
          ></a>
          <div className="w-full flex flex-row gap-5 text-gray-500">
            <span className="text-xs">10 commits</span>
            <span className="text-xs">1 merge</span>
            <span className="text-xs">3 dias atrás</span>
          </div>
        </div>
      </div>
    </div>
  );
}
