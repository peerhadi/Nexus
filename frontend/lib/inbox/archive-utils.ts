import type { ArchiveItem, ArchiveFilter } from "./archive-types";

export function filterArchiveItems(
  items: ArchiveItem[],
  search: string,
  filter: ArchiveFilter,
) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesFilter = filter === "All" || item.reason === filter;

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });
}
