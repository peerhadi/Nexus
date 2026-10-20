"use client";

import { ClipboardList, FolderKanban, Inbox, Users } from "lucide-react";

import ApiStatusBanner from "./api-status-banner";
import AdminSections from "./admin-sections";
import DashboardFooter from "./dashboard-footer";
import DashboardHeader from "./dashboard-header";
import DashboardNotice from "./dashboard-notice";
import OverviewCards from "./overview-cards";
import RecentActivity from "./recent-activity";
import { useDashboard } from "./use-dashboard";
import type { ActivityItem, DashboardMetric } from "./dashboard-types";
import {
  isActiveProject,
  isOpenConversation,
  isPendingRequest,
  numberFrom,
  recordDate,
} from "./dashboard-utils";

export default function DashboardContent() {
  const {
    data,
    loading,
    refreshing,
    apiStatus,
    lastUpdated,
    error,
    loadDashboard,
  } = useDashboard();

  const { stats, requests, projects, conversations } = data;

  const openConversations = conversations.filter(isOpenConversation);
  const pendingRequests = requests.filter(isPendingRequest);
  const activeProjects = projects.filter(isActiveProject);

  const metrics: DashboardMetric[] = [
    {
      title: "Open conversations",
      value: numberFrom(
        stats,
        ["openConversations", "openConversationsCount", "activeConversations"],
        openConversations.length,
      ),
      description: "Client communication",
      href: "/admin/inbox",
      icon: Inbox,
    },
    {
      title: "Pending requests",
      value: numberFrom(
        stats,
        ["pendingRequests", "pendingRequestsCount", "newRequests"],
        pendingRequests.length,
      ),
      description: "Awaiting review",
      href: "/admin/requests",
      icon: ClipboardList,
    },
    {
      title: "Active projects",
      value: numberFrom(
        stats,
        ["activeProjects", "activeProjectsCount", "inProgressProjects"],
        activeProjects.length,
      ),
      description: "In progress or review",
      href: "/admin/progress",
      icon: FolderKanban,
    },
    {
      title: "Total clients",
      value: numberFrom(
        stats,
        ["totalClients", "clientsCount", "totalUsers", "userCount"],
        0,
      ),
      description: "Registered accounts",
      href: "/admin/clients",
      icon: Users,
    },
  ];

  const recentActivity: ActivityItem[] = [
    ...requests.map((item) => ({
      item,
      type: "Request",
      href: "/admin/requests",
      icon: ClipboardList,
    })),
    ...conversations?.map((item) => ({
      item,
      type: "Conversation",
      href: "/admin/inbox",
      icon: Inbox,
    })),
    ...projects.map((item) => ({
      item,
      type: "Project",
      href: "/admin/progress",
      icon: FolderKanban,
    })),
  ]
    .sort((a, b) => {
      const dateA = new Date(String(recordDate(a.item) ?? 0)).getTime();
      const dateB = new Date(String(recordDate(b.item) ?? 0)).getTime();

      return (
        (Number.isFinite(dateB) ? dateB : 0) -
        (Number.isFinite(dateA) ? dateA : 0)
      );
    })
    .slice(0, 6);

  return (
    <main className="nexus-page min-h-full">
      <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Page heading */}
        <DashboardHeader
          refreshing={refreshing}
          onRefresh={() => void loadDashboard(true)}
        />

        {/* API connection */}
        <ApiStatusBanner apiStatus={apiStatus} lastUpdated={lastUpdated} />

        <DashboardNotice error={error} />

        {/* Overview cards */}
        <OverviewCards metrics={metrics} loading={loading} />

        {/* Activity and navigation */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.85fr] max-h-[fit-content]">
          <RecentActivity loading={loading} recentActivity={recentActivity} />
          <AdminSections />
        </div>

        <DashboardFooter apiStatus={apiStatus} />
      </div>
    </main>
  );
}
