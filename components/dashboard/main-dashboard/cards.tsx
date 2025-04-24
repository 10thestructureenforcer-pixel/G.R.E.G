"use client";
import React from "react";

const Cards = ({
  totalCases,
  title,
  icon,
}: {
  totalCases: number;
  title: string;
  icon: React.ReactNode;
}) => {
  // useEffect(() => {
  //   const isAlreadyLoggedOut = localStorage.getItem("isAlreadyLoggedOut");
  //   if (!isAlreadyLoggedOut) {
  //     localStorage.setItem("isAlreadyLoggedOut", "true");
  //      toast.loading("Signing Out,Please Sign-In Again");
  //     signOut({ redirectTo: "/" });
  //   }
  // }, []);
  return (
    <div className=" w-full">
      <div className="bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold text-foreground mt-1">
              {totalCases}
            </h3>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
