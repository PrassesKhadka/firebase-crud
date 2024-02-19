"use client";

import Sidebar from "@/app/components/Sidebar";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loginStatus } = useAuthObserver();

  // For authentication-> If not logged in then do not let the user access the dashboard or dashboard/users or /form ....
  useEffect(() => {
    console.log(loginStatus);
    console.log(currentUser);
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
          {loginStatus ? "true" : "false"}
          <section className="m-5 ml-8 mt-2">{children}</section>
        </div>
      ) : null}
    </>
  );
}
