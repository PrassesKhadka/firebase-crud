"use client";

import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import { Inter, PT_Mono, Lusitana, Great_Vibes } from "next/font/google";
import Sidebar from "./reusableComponents/Sidebar";
import { useAuthObserver } from "./firebase/auth/useAuthObserver";
import { redirect, useRouter } from "next/navigation";

export const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser, loginStatus } = useAuthObserver();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!loginStatus) redirect("/login");
  }, []);

  return (
    <html lang="en" className="box-border m-0 p-0 border-0 outline-none">
      <StoreProvider>
        <body className={`${inter.className} antialiased`}>
          <main>{children}</main>
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
