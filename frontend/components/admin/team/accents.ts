export const roomAccents = [
  {
    icon: "text-[var(--accent)]",
    surface: "bg-[var(--accent-subtle)]",
  },
  {
    icon: "text-[var(--success)]",
    surface: "bg-[var(--success-bg)]",
  },
  {
    icon: "text-[var(--info)]",
    surface: "bg-[var(--info-bg)]",
  },
  {
    icon: "text-[var(--warning)]",
    surface: "bg-[var(--warning-bg)]",
  },
];

export function roomAccent(id: string) {
  const index = [...id].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return roomAccents[index % roomAccents.length];
}
