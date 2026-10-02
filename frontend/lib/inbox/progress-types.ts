export type ProjectStatus =
  "PLANNING" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "PAUSED";

export type UpdateType = "PROGRESS" | "MILESTONE" | "NOTE" | "COMPLETED";

export type ProjectUpdate = {
  id: string;
  projectId: string;
  authorId: string;
  title: string;
  description: string;
  type: UpdateType;
  progress: number;
  createdAt: string;
  updatedAt: string;
  comments: UpdateComment[];
};

export type UpdateComment = {
  id: string;
  updateId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectClient = {
  id: string;
  name: string;
  email: string;
};

export type Project = {
  id: string;
  clientId: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  progress: number;
  startDate: string | null;
  deadline: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  client?: ProjectClient;
  updates: ProjectUpdate[];
  logs?: ActivityLog[];
};

export type ActivityLog = {
  id: string;
  projectId: string | null;
  userId: string | null;
  action: string;
  description: string | null;
  createdAt: string;
};

export type ProjectFilter = "All" | ProjectStatus;
