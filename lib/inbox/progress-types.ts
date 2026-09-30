export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Update = {
  id: number;
  text: string;
  date: string;
};

export type ProjectStatus = "On track" | "Needs attention" | "Completed";

export type Project = {
  id: string;
  client: string;
  email: string;
  name: string;
  type: string;
  progress: number;
  status: ProjectStatus;
  color: string;
  light: string;
  deadline: string;
  todos: Todo[];
  updates: Update[];
};

export type ProjectFilter = "All" | ProjectStatus;
