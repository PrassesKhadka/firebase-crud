"use client";

import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import RegisterPage from "./components/registerPage";

const Register = () => {
  const { loginStatus } = useAuthObserver();

  // If user logged in then do not let them access register or login page
  useEffect(() => {
    if (loginStatus === true) {
      redirect("/dashboard");
    }
  }, [loginStatus]);

  return <>{loginStatus === "checking" ? "Loading..." : <RegisterPage />}</>;
};

export default Register;
