"use client";

import Sidebar from "@/app/reusableComponents/Sidebar";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFetchAuthUserDataQuery } from "@/app/redux/features/auth/authAPI";
import { UserNav } from "@/app/(pages)/dashboard/components/user-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loginStatus } = useAuthObserver();
  const { data } = useFetchAuthUserDataQuery({
    // since you cannot enter dashboard if you are not logged in
    // so we can assert it will be a string
    id: currentUser?.uid as string,
  });

  // For authentication-> If not logged in then do not let the user access the dashboard or dashboard/users or /form ....
  useEffect(() => {
    if (loginStatus === false) {
      redirect("/login");
    }
  }, [loginStatus]);

  return (
    <>
      {loginStatus === "checking" ? (
        "Loading"
      ) : loginStatus === true ? (
        <div className="relative flex min-h-screen max-w-screen">
          <Sidebar />
          <div className=" absolute right-2 top-4 flex items-center space-x-2">
            <UserNav
              name={`${data?.fullName.firstName} ${data?.fullName.lastName}`}
              email={data ? data?.email : ""}
            />
          </div>
          <section className="m-5 ml-8 mt-2">{children}</section>
        </div>
      ) : null}
    </>
  );
}
