"use client";

import React from "react";
import Image from "next/image";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { useFetchAuthUserDataQuery } from "@/app/redux/features/auth/authAPI";
import { PascalCase } from "@/app/utils/pascalCase";
import { UserNav } from "@/app/(pages)/dashboard/components/user-nav";

const Dashboard = () => {
  const { currentUser } = useAuthObserver();
  const { data } = useFetchAuthUserDataQuery({
    // since you cannot enter dashboard if you are not logged in
    // so we can assert it will be a string
    id: currentUser?.uid as string,
  });

  return (
    <>
      {" "}
      <>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!{" "}
                {PascalCase(
                  `${data?.fullName.firstName} ${data?.fullName.lastName}`
                )}
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
          </div>
          data table
        </div>
      </>
    </>
  );
};

export default Dashboard;
