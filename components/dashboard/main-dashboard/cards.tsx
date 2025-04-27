"use client";
import React from "react";

interface CardsProps {
  totalCases: number;
  title: string;
  icon: React.ReactNode;
  isPro?: boolean;
}

const Cards = ({ totalCases, title, icon, isPro }: CardsProps) => {
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
        <div
          className={`p-3 rounded-full ${
            isPro
              ? "bg-cyan-100 dark:bg-cyan-900/30"
              : "bg-green-100 dark:bg-green-900/30"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Cards;
