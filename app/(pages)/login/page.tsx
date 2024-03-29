"use client";

import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import LoginPage from "./components/loginPage";

const Login = () => {
  const { loginStatus } = useAuthObserver();

  // If user logged in then do not let them access login page
  useEffect(() => {
    if (loginStatus === true) {
      redirect("/dashboard");
    }
  }, [loginStatus]);

  return <>{loginStatus === "checking" ? "Loading..." : <LoginPage />}</>;
};

export default Login;
