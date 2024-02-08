export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen m-2">{children}</section>;
}
