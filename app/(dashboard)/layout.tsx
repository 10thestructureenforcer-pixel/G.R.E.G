import { AppSidebar } from "@/components/app-sidebar";
import CustomTrigger from "@/components/dashboard/custom-trigger";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
          <div className="flex flex-1 items-center gap-4">
            <CustomTrigger />
            {/* <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search legal resources..."
                className="w-full pl-9 bg-slate-50 border-slate-200 focus-visible:ring-green-500/20 focus-visible:ring-offset-0"
              />
            </div> */}
            {/* <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500" />
              </Button>
            </div> */}
          </div>
        </header>
        <div className="bg-gradient-to-b from-green-50/50 to-transparent h-2" />
        {children}
      </main>
    </SidebarProvider>
  );
}
