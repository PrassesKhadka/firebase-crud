"use client";

import AuthenticationPage from "@/app/components/Authentication";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { Icons } from "@/components/ui/icons";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { loginStatus } = useAuthObserver();

  // If user logged in then do not let them access login page
  useEffect(() => {
    if (loginStatus === true) {
      redirect("/dashboard");
    }
  }, [loginStatus]);

  return (
    <>{loginStatus === "checking" ? "Loading..." : <AuthenticationPage />}</>
  );
};

export default Login;
