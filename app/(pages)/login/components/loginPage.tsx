import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AuthenticationWrapper from "@/app/reusableComponents/Authentication/authWrapper";
import { UserLoginForm } from "./userLoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-screen w-screen md:grid lg:min-w-screen  lg:px-0">
        <AuthenticationWrapper
          title="Welcome back"
          description="Enter your email to sign in to your account"
          footer={""}
          footerLinks={[
            { title: "Don't have an account? Sign Up", href: "register" },
          ]}
          buttons={[{ title: "Google", iconName: "google", fn: () => {} }]}
        >
          <UserLoginForm />
        </AuthenticationWrapper>
      </div>
    </>
  );
}
