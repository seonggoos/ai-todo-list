export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  notifyAt?: string;
}

export type SortType = "dueDate" | "priority" | "createdAt";
export type FilterType = "all" | "completed" | "active" | "dueClose";
