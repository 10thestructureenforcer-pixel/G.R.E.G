"use client";
import { Calendar, Home, Inbox, Search, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Research",
    url: "/research",
    icon: Inbox,
  },
  {
    title: "Guidance",
    url: "/guidance",
    icon: Calendar,
  },
  {
    title: "Chatbot",
    url: "/chatbot",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      variant="floating"
      className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-[url('/subtle-pattern.png')] bg-opacity-5"
    >
      <SidebarHeader className="m-3 overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-white shadow-md border border-green-100 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-start p-3 gap-3 group">
          <div className="relative overflow-hidden rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md">
            <Image
              src="/greg-logo.jpg"
              alt="logo"
              width={50}
              height={50}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </div>
          <div>
            <p className="font-bold text-2xl bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              G.R.E.G
            </p>
            <p className="text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
              Legal AI Assistant
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-3 bg-green-100/50" />
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-4">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem
                    className={cn(
                      "my-1.5 rounded-lg overflow-hidden transition-all p-2 duration-300",
                      isActive
                        ? "bg-gradient-to-r from-green-50 to-green-50/20"
                        : "hover:bg-slate-50/80"
                    )}
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="gap-4 px-3 p-2 py-2.5 transition-all duration-300 hover:translate-x-1"
                      asChild
                      isActive={isActive}
                    >
                      <Link href={item.url} className="flex items-center">
                        <div
                          className={cn(
                            " rounded-md transition-all p-2 duration-300",
                            isActive
                              ? "bg-gradient-to-br from-green-200 to-emerald-100 text-green-800 shadow-sm"
                              : "text-slate-500 hover:bg-slate-100/80"
                          )}
                        >
                          <item.icon
                            size={18}
                            className={cn(
                              "transition-all duration-300",
                              isActive ? "stroke-green-800" : "stroke-slate-500"
                            )}
                            style={
                              isActive
                                ? {
                                    fill: "rgba(147, 250, 165, 0.15)",
                                    strokeWidth: 2,
                                  }
                                : { strokeWidth: 1.5 }
                            }
                          />
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium transition-all duration-300",
                            isActive ? "text-green-800" : "text-slate-700"
                          )}
                        >
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="ml-auto h-6 w-1 rounded-full bg-gradient-to-b from-green-400 to-emerald-500 shadow-sm" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto pb-4">
        <SidebarSeparator className="mx-3 bg-green-100/50 mb-4" />
        <div className="flex flex-col px-3 gap-3">
          {/* <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50/80 border border-slate-100">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
              <AvatarImage src="/avatar-placeholder.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-200 text-green-800">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-slate-500">Administrator</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full"
            >
              <User size={16} />
            </Button>
          </div> */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-sm bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-300"
          >
            <LogOut size={14} />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
