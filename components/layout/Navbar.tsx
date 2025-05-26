"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Bookmark, 
  BarChart3
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col h-full bg-card border-r border-border p-4 w-64">
      <div className="mb-8 flex items-center">
        <Users className="h-8 w-8 text-primary mr-2" />
        <h1 className="font-semibold text-xl">HR Dashboard</h1>
      </div>
      
      <div className="space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center py-2.5 px-4 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-muted"
            )}
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-border">
        <ModeToggle />
      </div>
    </nav>
  );
}