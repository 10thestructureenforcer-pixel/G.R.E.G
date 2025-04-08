"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import ViewClients from "./view-clients";
import Link from "next/link";

const ClientInfoButton = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2 w-full sm:w-auto">
      <Link href="/dashboard/add-client">
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black transition-colors duration-200 w-full sm:w-auto cursor-pointer">
          Add Client
        </Button>
      </Link>
      <ViewClients />
    </div>
  );
};

export default ClientInfoButton;
