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
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <CustomTrigger />
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
