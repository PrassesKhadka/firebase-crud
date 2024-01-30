import Sidebar from "./components/Sidebar";
import "./globals.css";
import StoreProvider from "./redux/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className="flex min-h-screen flex-col items-center gap-10  py-4">
          <Sidebar />
          <main className="absolute left-[25%]">{children}</main>
        </body>
      </StoreProvider>
    </html>
  );
}
