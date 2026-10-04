import type { Client } from "@/lib/inbox/client-types";

type ClientListItemProps = {
  client: Client;
  selected: boolean;
  onSelect: () => void;
};

const avatarGradients = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-emerald-400 to-teal-600",
  "from-orange-400 to-pink-500",
  "from-blue-500 to-indigo-600",
  "from-pink-500 to-rose-500",
  "from-amber-400 to-orange-600",
  "from-teal-400 to-cyan-600",
];

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarGradient(client: Client) {
  const value = `${client.id}${client.name}`;

  let hash = 0;

  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return avatarGradients[hash % avatarGradients.length];
}

export function ClientListItem({
  client,
  selected,
  onSelect,
}: ClientListItemProps) {
  const initials = getInitials(client.name);
  const gradient = getAvatarGradient(client);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
        selected ? "bg-[var(--surface-hover)]" : "hover:bg-[var(--surface-hover)]"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-[11px] font-bold text-white shadow-sm`}
      >
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate text-[11px] font-bold text-[var(--text-primary)]">
            {client.name}
          </div>

          {selected && (
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          )}
        </div>

        <div className="mt-0.5 truncate text-[10px] font-medium text-[var(--text-muted)]">
          {client.email}
        </div>
      </div>
    </button>
  );
}
