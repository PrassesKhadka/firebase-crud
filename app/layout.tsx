import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";
import { Inter, PT_Mono, Lusitana, Great_Vibes } from "next/font/google";

export const inter = PT_Mono({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="box-border m-0 p-0 border-0 outline-none">
      <StoreProvider>
        <body
          className={`${inter.className} antialiased flex min-h-screen max-w-screen flex-col items-center relative `}
        >
          <Sidebar />
          <main className="absolute left-[20%]  min-h-screen ">{children}</main>
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
