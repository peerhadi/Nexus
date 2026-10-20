"use client";

import { ClientsErrorState } from "@/components/admin/inbox/clients/clients-error-state";
import { ClientsHeader } from "@/components/admin/inbox/clients/clients-header";
import { ClientsWorkspace } from "@/components/admin/inbox/clients/clients-workspace";
import {
  clientFilters,
  useClientsPage,
} from "@/components/admin/inbox/clients/use-clients-page";

export default function ClientsPage() {
  const {
    clients,
    error,
    filter,
    filteredClients,
    handleSelectClient,
    mobileDrawerOpen,
    search,
    selectedClient,
    setFilter,
    setMobileDrawerOpen,
    setSearch,
  } = useClientsPage();

  if (error) {
    return <ClientsErrorState error={error} />;
  }

  return (
    <main className="h-dvh w-full min-w-0 overflow-hidden bg-[var(--surface-secondary)] text-[var(--text-primary)]">
      <div className="flex h-full min-h-0 flex-col">
        <ClientsHeader count={clients.length} />

        <ClientsWorkspace
          clients={clients}
          filteredClients={filteredClients}
          selectedClient={selectedClient}
          search={search}
          filter={filter}
          filters={clientFilters}
          mobileDrawerOpen={mobileDrawerOpen}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onSelect={handleSelectClient}
          onOpenMenu={() => setMobileDrawerOpen(true)}
          onCloseMenu={() => setMobileDrawerOpen(false)}
        />
      </div>
    </main>
  );
}
