"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Research",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Cases",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Chatbot",
    url: "#",
    icon: Search,
  },
  {
    title: "Account",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image
            src="/greg-logo.jpg"
            alt="logo"
            width={80}
            height={100}
            className="rounded-md"
          />
          <p className="font-medium text-2xl">G.R.E.G</p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="invisible" />
      <SidebarHeader className="w-full"></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
