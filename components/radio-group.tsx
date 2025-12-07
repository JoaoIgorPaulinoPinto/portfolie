"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface props {
  options: string[];
  selected: (value: string) => void;
}
export function RatioGroupFilter(props: props) {
  const [position, setPosition] = React.useState("bottom");
  const [selected, setSelected] = React.useState("");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {selected != "" ? "Filtando por " + selected : "Filtrar"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5">
        <DropdownMenuLabel>Assunto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {props.options.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              onClick={() => {
                setSelected(item);
              }}
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
