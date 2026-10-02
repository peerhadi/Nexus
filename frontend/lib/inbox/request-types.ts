export type RequestStatus = "NEW" | "IN_PROGRESS" | "REPLIED" | "CLOSED";

export type Request = {
  id: string;
  clientId: string;

  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;

  status: RequestStatus;

  createdAt: string;
  updatedAt: string;

  client?: {
    id: string;
    name: string;
    email: string;
  };
  project?: {
    id: string;
    name: string;
    status: string;
    progress: number;
  } | null;
};

export type RequestFilter = "All" | RequestStatus;
