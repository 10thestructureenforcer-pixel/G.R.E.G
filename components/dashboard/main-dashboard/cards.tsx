"use client";
import React from "react";

interface CardsProps {
  totalCases: number;
  title: string;
  icon: React.ReactNode;
}

const Cards = ({ totalCases, title, icon }: CardsProps) => {
  // useEffect(() => {
  //   const isAlreadyLoggedOut = localStorage.getItem("isAlreadyLoggedOut");
  //   if (!isAlreadyLoggedOut) {
  //     localStorage.setItem("isAlreadyLoggedOut", "true");
  //      toast.loading("Signing Out,Please Sign-In Again");
  //     signOut({ redirectTo: "/" });
  //   }
  // }, []);
  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold mt-2">{totalCases}</p>
        </div>
        <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Cards;
