"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/app/firebase/auth/auth";
import { Controller, useForm } from "react-hook-form";
import { IuserEmailAndPassword } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { EyeIcon, LucideEyeOff } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserLoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IuserEmailAndPassword>({
    defaultValues: { email: "testUser@gmail.com", password: "Test@123" },
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: IuserEmailAndPassword) {
    setIsLoading(true);
    try {
      await loginUser(data);
      reset({ email: "", password: "" });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "This is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                  message: "Email is required",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  id="email"
                  onChange={onChange}
                  value={value}
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              )}
            />
            <p className="text-sm text-muted-foreground text-red-500 py-1">
              {errors?.email?.message}
            </p>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "This is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
                  message:
                    "Password must be at least 8 characters long and include 1 capital letter, 1 number, and 1 symbol.",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  id="password"
                  onChange={onChange}
                  value={value}
                  placeholder="password"
                  type={showPassword ? "text" : "password"}
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="relative"
                />
              )}
            />
            <div className="flex justify-start items-center gap-2 mt-2 p-2 pl-0">
              <Checkbox
                id="show-password"
                className=""
                onCheckedChange={toggleShowPassword}
              />
              <Label htmlFor="show-password" className="">
                Show Password
              </Label>
            </div>
            <p className="text-sm text-muted-foreground text-red-500 py-1">
              {errors?.password?.message}
            </p>
          </div>
          <Button disabled={isLoading}>
            {isLoading && "Loading..."}
            Sign In With Email
          </Button>
        </div>
      </form>
    </div>
  );
}
