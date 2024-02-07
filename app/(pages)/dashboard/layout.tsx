export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="border-red-500 border-4">{children}</section>;
}
