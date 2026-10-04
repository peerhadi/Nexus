import AmbientBackground from "@/components/user/dashboard/ambient-background";
import Sidebar from "@/components/user/dashboard/sidebar";
import TopBar from "@/components/user/dashboard/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)]">
      <AmbientBackground />

      <Sidebar />

      <div className="relative min-h-screen lg:pl-[235px]">
        <TopBar />

        {children}
      </div>
    </div>
  );
}
