import { themes } from "./settings-data";

export function getToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("nexus_token") ?? sessionStorage.getItem("nexus_token")
  );
}

export function getSavedTheme() {
  if (typeof window === "undefined") return "neon";

  const saved = localStorage.getItem("nexus_theme");
  return themes.some((theme) => theme.id === saved) ? saved! : "neon";
}

export function getSavedAppearance() {
  if (typeof window === "undefined") return "dark";

  return localStorage.getItem("nexus_mode") === "dark" ? "dark" : "light";
}
