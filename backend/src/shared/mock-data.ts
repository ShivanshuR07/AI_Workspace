import fs from "node:fs";
import path from "node:path";

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

export const tasks: WorkspaceTask[] = [
  {
    id: 1,
    title: "Review Q1 financial report",
    priority: "High",
    status: "In Progress",
    assignee: "Sarah Chen",
    due: "2026-05-02",
    source: "document",
  },
  {
    id: 2,
    title: "Prepare partner presentation slides",
    priority: "Medium",
    status: "Not Started",
    assignee: "Mike Roberts",
    due: "2026-05-03",
    source: "meeting",
  },
  {
    id: 3,
    title: "Update launch project timeline",
    priority: "Low",
    status: "In Progress",
    assignee: "Lisa Park",
    due: "2026-05-06",
    source: "manual",
  },
  {
    id: 4,
    title: "Schedule client renewal call",
    priority: "High",
    status: "Not Started",
    assignee: "Tom Wilson",
    due: "2026-05-02",
    source: "email",
  },
  {
    id: 5,
    title: "Review contract exception list",
    priority: "Medium",
    status: "Completed",
    assignee: "Emma Davis",
    due: "2026-05-01",
    source: "document",
  },
];

export const activity = [
  {
    id: 1,
    action: "Insight generated",
    item: "Renewal risk surfaced from Client Proposal",
    time: "8 minutes ago",
    route: "/documents",
  },
  {
    id: 2,
    action: "Meeting summarized",
    item: "Product launch sync",
    time: "24 minutes ago",
    route: "/meetings",
  },
  {
    id: 3,
    action: "Task extracted",
    item: "Schedule client renewal call",
    time: "1 hour ago",
    route: "/tasks",
  },
  {
    id: 4,
    action: "Email drafted",
    item: "Partner follow-up",
    time: "2 hours ago",
    route: "/email",
  },
];

export const insights = [
  {
    id: 1,
    title: "Two high-priority tasks are due today",
    summary: "The renewal call and Q1 report review are the best places to spend attention first.",
    confidence: 94,
    route: "/tasks",
  },
  {
    id: 2,
    title: "Client proposal mentions budget sensitivity",
    summary: "AI found repeated pricing concerns across the latest proposal notes and email draft.",
    confidence: 88,
    route: "/documents",
  },
  {
    id: 3,
    title: "Launch sync needs an owner decision",
    summary: "The timeline is moving, but the meeting summary has one unresolved dependency.",
    confidence: 82,
    route: "/meetings",
  },
];

const defaultSettings = {
  profile: {
    fullName: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "Product Manager",
  },
  aiPreferences: {
    autoSummaries: true,
    emailSuggestions: true,
    documentInsights: true,
    taskExtraction: false,
  },
  appearance: {
    theme: "light",
  },
  integrations: {
    gmail: false,
    slack: false,
    googleDrive: true,
  },
};

const settingsFile = path.join(process.cwd(), "data", "settings.json");

function readSettings() {
  if (!fs.existsSync(settingsFile)) {
    return defaultSettings;
  }

  return JSON.parse(fs.readFileSync(settingsFile, "utf8")) as typeof defaultSettings;
}

export let settings = readSettings();

export function updateSettings(nextSettings: typeof defaultSettings) {
  settings = nextSettings;
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2));
  return settings;
}
