import OverviewHero from "@/components/user/dashboard/overview/hero";
import OverviewStats from "@/components/user/dashboard/overview/stats";
import OverviewProjects from "@/components/user/dashboard/overview/projects";
import OverviewActivity from "@/components/user/dashboard/overview/activity";

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <OverviewHero />

      <OverviewStats />

      <div className="grid gap-7 xl:grid-cols-[1.55fr_1fr]">
        <OverviewProjects />
        <OverviewActivity />
      </div>
    </div>
  );
}
