"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
  Compass,
  Book,
  BookUser,
  Scale,
  Notebook,
  NotebookTabs,
} from "lucide-react";
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
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Guidance",
    url: "/guidance",
    icon: Compass,
  },
  {
    title: "Research",
    url: "/research",
    icon: NotebookTabs,
  },
  {
    title: "Ethics",
    url: "/ethics",
    icon: Scale,
  },
  {
    title: "Governance",
    url: "/governance",
    icon: BookUser,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const darkLogo = "/logos/logo_dark_mode.png";
  const lightLogo = "/logos/greg_final.png";

  return (
    <Sidebar
      variant="floating"
      className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarHeader className="overflow-hidden">
        <div className="flex items-center p-2">
          <div className="relative overflow-hidden group cursor-pointer w-[70px] h-[70px] bg-background rounded-lg">
            {theme === "dark" ? (
              <Image src={darkLogo} alt="logo" width={70} height={70} />
            ) : (
              <Image src={lightLogo} alt="logo" width={70} height={70} />
            )}
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="bg-border" />
      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-1">
              {items.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`);

                return (
                  <SidebarMenuItem
                    className={cn(
                      "my-1.5 rounded-lg overflow-hidden transition-all p-1 duration-300",
                      isActive ? "bg-accent" : "hover:bg-accent/50"
                    )}
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="gap-4 px-3 p-2 py-2.5 transition-all duration-300 "
                      asChild
                      isActive={isActive}
                    >
                      <Link href={item.url} className="flex items-center">
                        <item.icon
                          size={18}
                          className={cn(
                            "transition-all duration-300",
                            isActive
                              ? "stroke-green-500 dark:stroke-green-400"
                              : "stroke-muted-foreground"
                          )}
                          style={
                            isActive
                              ? {
                                  strokeWidth: 2,
                                }
                              : { strokeWidth: 1.5 }
                          }
                        />
                        <span
                          className={cn(
                            "text-sm font-medium transition-all duration-300",
                            isActive
                              ? "text-green-500 dark:text-green-400"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="ml-auto h-6 w-1 rounded-full bg-green-500 dark:bg-green-400" />
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

      <Link href={"/pricing"}>
        <div className="p-2 ">
          <Button className="w-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700 ">
            View Plans
          </Button>
        </div>
      </Link>

      <SidebarFooter className="mt-auto pb-4">
        <SidebarSeparator className="mx-3 bg-border mb-4" />
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
            className="gap-2 text-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors duration-300 cursor-pointer"
            onClick={() => {
              toast.success("Signing out...");
              signOut({ redirectTo: "/" });
            }}
          >
            <LogOut size={14} />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
