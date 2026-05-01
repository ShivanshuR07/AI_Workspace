import type { TaskPriority, TaskStatus } from "../lib/api";

const priorityClassName: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-blue-100 text-blue-700",
};

const statusClassName: Record<TaskStatus, string> = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Not Started": "bg-gray-100 text-gray-700",
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <span className={`rounded px-2 py-1 text-sm ${priorityClassName[priority]}`}>{priority}</span>;
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <span className={`rounded px-2 py-1 text-sm ${statusClassName[status]}`}>{status}</span>;
}
