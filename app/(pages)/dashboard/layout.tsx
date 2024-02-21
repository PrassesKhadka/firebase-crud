"use client";

import Sidebar from "@/app/reusableComponents/Sidebar";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFetchAuthUserDataQuery } from "@/app/redux/features/auth/authAPI";

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
  console.log(currentUser);
  console.log(data);

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
        <div className="flex min-h-screen max-w-screen">
          <Sidebar />
          Welcome to the Dashboard {currentUser?.email} and{" "}
          {data?.fullName.firstName} {loginStatus ? "true" : "false"}
          <section className="m-5 ml-8 mt-2">{children}</section>
        </div>
      ) : null}
    </>
  );
}
