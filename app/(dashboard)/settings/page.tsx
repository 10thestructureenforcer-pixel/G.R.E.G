import { auth } from "@/auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SettingsUser } from "@/lib/types";
import SettingsClient from "@/components/dashboard/settings/settings-client";

function SettingsSkeleton() {
  return (
    <div className="space-y-6 p-4">
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

async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        client: true,
      },
    });

    if (!user) {
      return <div>No user found</div>;
    }

    const settingsUser: SettingsUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      isPro: user.isPro,
      client: user.client,
    };

    return (
      <div className="p-2">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <SettingsClient user={settingsUser} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user settings:", error);
    throw new Error("Failed to load settings");
  }
}

export default function SettingsPageWrapper() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsPage />
    </Suspense>
  );
}
