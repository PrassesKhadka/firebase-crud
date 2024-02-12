"use client";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import { Inter, PT_Mono, Lusitana, Great_Vibes } from "next/font/google";
import Sidebar from "./components/Sidebar";

export const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="box-border m-0 p-0 border-0 outline-none">
      <StoreProvider>
        <body
          className={`${inter.className} antialiased flex min-h-screen max-w-screen `}
        >
          <Sidebar />
          <main className="m-5 ml-8 mt-2">{children}</main>
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
