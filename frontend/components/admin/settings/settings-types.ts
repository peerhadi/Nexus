export type AdminUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export type ConnectionState = "checking" | "connected" | "error";

export type ThemeOption = {
  id: string;
  name: string;
  description: string;
  accent: string;
};
