import { Metadata } from "next";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import AuthenticationWrapper from "@/app/reusableComponents/Authentication/authWrapper";
import { UserRegisterForm } from "./userRegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <>
      <div className="container relative min-h-screen min-w-screen mt-12 mb-3 md:grid md:mt-1 md:mb-1 lg:min-w-screen  lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 -top-10 md:right-8 md:top-2 border"
          )}
        >
          Login
        </Link>
        <AuthenticationWrapper
          title="Create an account"
          description="Enter your email below to create your account"
          footer={`By clicking continue, you agree to our `}
          footerLinks={[
            { title: "Terms of services", href: "terms" },
            { title: "Privacy Policy", href: "privacy-policy" },
          ]}
          buttons={[{ title: "Google", iconName: "google", fn: () => {} }]}
        >
          <UserRegisterForm />
        </AuthenticationWrapper>
      </div>
    </>
  );
}
