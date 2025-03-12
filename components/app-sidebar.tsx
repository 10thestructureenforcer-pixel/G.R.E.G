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
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <Sidebar variant="floating">
      <SidebarHeader className=" border-2 m-2 rounded-md ">
        <div className="flex items-center -mx-2 ">
          <Image
            src="/greg-logo.jpg"
            alt="logo"
            width={90}
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
            <SidebarMenu className="py-8 ">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem
                    className="my-1  rounded-md"
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="gap-4"
                      asChild
                      isActive={isActive}
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={
                            isActive ? "stroke-[1.5] text-black  " : ""
                          }
                          style={
                            isActive
                              ? {
                                  fill: "rgba(147, 250, 165,0.35)",
                                  stroke: "black",
                                  strokeWidth: 1.5,
                                }
                              : undefined
                          }
                        />
                        <span className="text-md">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
