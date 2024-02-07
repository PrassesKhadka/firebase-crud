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
    <html lang="en">
      <StoreProvider>
        <body
          className={`${inter.className} antialiased flex min-h-screen flex-col items-center gap-10 `}
        >
          <Sidebar />
          <main className="absolute left-[25%]">{children}</main>
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
