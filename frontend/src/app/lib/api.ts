const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

export type TaskStatus = "Not Started" | "In Progress" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export type WorkspaceTask = {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  due: string;
  source: "meeting" | "email" | "document" | "manual";
};

export type ActivityItem = {
  id: number;
  action: string;
  item: string;
  time: string;
  route: string;
};

export type Insight = {
  id: number;
  title: string;
  summary: string;
  confidence: number;
  route: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  trend: "up" | "down";
};

export type DashboardOverview = {
  metrics: DashboardMetric[];
  activity: ActivityItem[];
  tasks: WorkspaceTask[];
  insights: Insight[];
};

export type WorkspaceSettings = {
  profile: {
    fullName: string;
    email: string;
    role: string;
  };
  aiPreferences: {
    autoSummaries: boolean;
    emailSuggestions: boolean;
    documentInsights: boolean;
    taskExtraction: boolean;
  };
  appearance: {
    theme: "light" | "dark" | "auto";
  };
  integrations: {
    gmail: boolean;
    slack: boolean;
    googleDrive: boolean;
  };
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  dashboard: () => request<DashboardOverview>("/dashboard/overview"),
  tasks: (status = "All", priority = "All") =>
    request<{ tasks: WorkspaceTask[] }>(`/tasks?status=${encodeURIComponent(status)}&priority=${encodeURIComponent(priority)}`),
  updateTask: (id: number, status: TaskStatus) =>
    request<{ task: WorkspaceTask }>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  createTask: (title: string) =>
    request<{ task: WorkspaceTask }>("/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),
  command: (prompt: string) =>
    request<{ answer: string; suggestions: string[] }>("/ai/command", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    }),
  settings: () => request<{ settings: WorkspaceSettings }>("/settings"),
  saveSettings: (settings: WorkspaceSettings) =>
    request<{ settings: WorkspaceSettings }>("/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),
};
