import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsClient from "./settings-client";
import prisma from "@/lib/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card Skeleton */}
        <div className="rounded-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Client Management Card Skeleton */}
        <div className="rounded-lg border p-6">
          <div className="mb-6">
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      client: true,
    },
  });

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="text-sm text-muted-foreground">
            Total Clients: {user?.client.length}
          </div>
        </div>
        <Suspense fallback={<SettingsSkeleton />}>
          <SettingsClient user={user} />
        </Suspense>
      </div>
    </div>
  );
}
