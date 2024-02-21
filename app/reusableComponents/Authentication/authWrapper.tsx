import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons, TiconKey } from "@/components/ui/icons";

interface IfooterLinks {
  title: string;
  href: string;
}

interface IauthenticationWrapperProps {
  title: string;
  description: string;
  footer: string;
  footerLinks: IfooterLinks[];
  // The children is the form part
  children: React.ReactElement;
  buttons: {
    title: string;
    iconName: TiconKey;
    fn: (arg: any) => void;
  }[];
  isLoading?: boolean;
}

const AuthenticationWrapper = ({
  title,
  description,
  footer,
  footerLinks,
  children,
  buttons,
  isLoading,
}: IauthenticationWrapperProps) => {
  return (
    <>
      {" "}
      <div className=" w-full h-full flex justify-center items-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {/* Input fields */}
          {children}

          {/* Continue with other accounts */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {buttons?.map((button, index) => {
            const IconComponent = Icons[button.iconName];
            return (
              <Button
                key={index}
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={button.fn}
              >
                {isLoading ? (
                  "Loading..."
                ) : (
                  <IconComponent className="mr-2 h-4 w-4" />
                )}{" "}
                {button.title}
              </Button>
            );
          })}

          {/* Footer */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            {footer}{" "}
            {footerLinks?.map((link, index) => {
              return (
                <>
                  <Link
                    key={index}
                    href={`/${link.href}`}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {link.title}
                  </Link>
                  {index !== footerLinks.length - 1 && " and "}
                </>
              );
            })}
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthenticationWrapper;
