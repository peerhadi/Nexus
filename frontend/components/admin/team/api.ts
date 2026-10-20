export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
).replace(/\/+$/, "");

export const WS_ORIGIN = API_URL.replace(/^http/, "ws").replace(/\/api$/, "");

function readToken() {
  if (typeof window === "undefined") return null;

  return (
    window.localStorage.getItem("nexus_token") ||
    window.sessionStorage.getItem("nexus_token")
  );
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = readToken();

  if (!token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (response.status === 204) return undefined as T;

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.message || body?.error || `Request failed (${response.status})`,
    );
  }

  return body as T;
}
