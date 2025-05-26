"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-full justify-between">
          <div className="flex items-center">
            {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
            {theme === "system" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
            <span className="ml-2">{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
          </div>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M4.93179 6.43179C4.75605 6.25605 4.75605 5.97039 4.93179 5.79465C5.10753 5.61892 5.39319 5.61892 5.56893 5.79465L7.5 7.72573L9.43107 5.79465C9.60681 5.61892 9.89247 5.61892 10.0682 5.79465C10.2439 5.97039 10.2439 6.25605 10.0682 6.43179L7.81066 8.68933C7.72333 8.77666 7.61166 8.82001 7.5 8.82001C7.38834 8.82001 7.27667 8.77666 7.18934 8.68933L4.93179 6.43179Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}