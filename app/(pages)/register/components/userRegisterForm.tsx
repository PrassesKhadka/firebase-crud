"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/app/firebase/auth/auth";
import { Controller, useForm } from "react-hook-form";
import { IauthUserData, IuserEmailAndPassword } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { useAddAuthUserDataMutation } from "@/app/redux/features/auth/authAPI";
import { Checkbox } from "@/components/ui/checkbox";

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({
  className,
  ...props
}: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const router = useRouter();
  const [addAuthUserData] = useAddAuthUserDataMutation({});

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IuserEmailAndPassword & Omit<IauthUserData, "createdAt">>();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(
    data: IuserEmailAndPassword & Omit<IauthUserData, "createdAt">
  ) {
    setIsLoading(true);
    try {
      const { email, password, fullName } = data;
      const user = await registerUser({ email, password });
      if (user) {
        await addAuthUserData({
          id: user.uid,
          data: { email, fullName },
        });
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      reset();
      router.push("/register");
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <div className="grid gap-1">
            {/* First name */}
            <Label className="sr-only" htmlFor="First Name">
              First Name
            </Label>
            <Controller
              control={control}
              name="fullName.firstName"
              rules={{
                required: "This is required",
                pattern: {
                  value: /^[a-zA-Z\p{L}-]+$/,
                  message: "numbers,symbols or spaces are not allowed",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  id="firstName"
                  onChange={onChange}
                  value={value}
                  placeholder="John"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              )}
            />
            <p className="text-sm text-muted-foreground text-red-500 py-1">
              {errors?.fullName?.firstName?.message}
            </p>

            {/* Last name */}
            <Label className="sr-only" htmlFor="Last Name">
              Last Name
            </Label>
            <Controller
              control={control}
              name="fullName.lastName"
              rules={{
                required: "This is required",
                pattern: {
                  value: /^[a-zA-Z\p{L}-]+$/,
                  message: "numbers,symbols or spaces are not allowed",
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  id="lastName"
                  onChange={onChange}
                  value={value}
                  placeholder="Doe"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              )}
            />
            <p className="text-sm text-muted-foreground text-red-500 py-1">
              {errors?.fullName?.lastName?.message}
            </p>

            {/* For email */}
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

            {/* For password */}
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
