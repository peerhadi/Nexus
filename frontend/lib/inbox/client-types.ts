export type UserRole = "CLIENT" | "ADMIN";

export type Client = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type ClientFilter = "All" | UserRole;
