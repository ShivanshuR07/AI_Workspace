import { FormEvent, useMemo, useState } from "react";
import { Filter, LayoutGrid, List, MoreVertical, Plus } from "lucide-react";
import { PriorityBadge, StatusBadge } from "../components/PriorityBadge";
import { StateBlock } from "../components/StateBlock";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { api, type TaskPriority, type TaskStatus, type WorkspaceTask } from "../lib/api";

const statusOptions = ["All", "Not Started", "In Progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];
const nextStatus: Record<TaskStatus, TaskStatus> = {
  "Not Started": "In Progress",
  "In Progress": "Completed",
  Completed: "Not Started",
};

export function Tasks() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [view, setView] = useState<"table" | "kanban">("table");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const { data, error, isLoading, reload } = useAsyncResource(
    () => api.tasks(statusFilter, priorityFilter),
    [statusFilter, priorityFilter],
  );

  const tasks = data?.tasks ?? [];
  const groupedTasks = useMemo(
    () => ({
      "Not Started": tasks.filter((task) => task.status === "Not Started"),
      "In Progress": tasks.filter((task) => task.status === "In Progress"),
      Completed: tasks.filter((task) => task.status === "Completed"),
    }),
    [tasks],
  );

  async function cycleTask(task: WorkspaceTask) {
    setIsMutating(true);
    await api.updateTask(task.id, nextStatus[task.status]);
    await reload();
    setIsMutating(false);
  }

  async function createTask(event: FormEvent) {
    event.preventDefault();
    if (!newTaskTitle.trim()) {
      return;
    }

    setIsMutating(true);
    await api.createTask(newTaskTitle.trim());
    setNewTaskTitle("");
    await reload();
    setIsMutating(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </div>
          <SegmentedOptions options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
          <SegmentedOptions options={priorityOptions} value={priorityFilter} onChange={setPriorityFilter} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex rounded-lg bg-accent p-1">
            <button
              type="button"
              onClick={() => setView("table")}
              className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm ${view === "table" ? "bg-card shadow-sm" : ""}`}
            >
              <List className="h-4 w-4" />
              Table
            </button>
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm ${view === "kanban" ? "bg-card shadow-sm" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Kanban
            </button>
          </div>
          <form onSubmit={createTask} className="flex min-w-0 gap-2">
            <input
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              placeholder="New task..."
              className="h-9 min-w-0 rounded-lg bg-input-background px-3 outline-none"
            />
            <button
              type="submit"
              disabled={isMutating}
              className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <StateBlock title="Loading tasks" description="Fetching current task status and owners." variant="loading" />
      ) : error ? (
        <StateBlock title="Tasks unavailable" description={error} actionLabel="Retry" onAction={reload} variant="error" />
      ) : tasks.length === 0 ? (
        <StateBlock title="No matching tasks" description="Adjust filters or add a task to start a new workflow." />
      ) : view === "table" ? (
        <TaskTable tasks={tasks} onCycleTask={cycleTask} isMutating={isMutating} />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {(Object.keys(groupedTasks) as TaskStatus[]).map((status) => (
            <section key={status} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base">{status}</h3>
                <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">{groupedTasks[status].length}</span>
              </div>
              <div className="space-y-3">
                {groupedTasks[status].map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => void cycleTask(task)}
                    disabled={isMutating}
                    className="w-full rounded-lg bg-muted p-3 text-left transition-colors hover:bg-accent disabled:opacity-60"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span>{task.title}</span>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <div className="text-sm text-muted-foreground">{task.assignee}</div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function SegmentedOptions({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`h-9 rounded-lg px-3 text-sm transition-colors ${
            value === option ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/80"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function TaskTable({
  tasks,
  onCycleTask,
  isMutating,
}: {
  tasks: WorkspaceTask[];
  onCycleTask: (task: WorkspaceTask) => Promise<void>;
  isMutating: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-muted">
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-muted-foreground">Task</th>
              <th className="px-5 py-3 text-left text-muted-foreground">Priority</th>
              <th className="px-5 py-3 text-left text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-muted-foreground">Assignee</th>
              <th className="px-5 py-3 text-left text-muted-foreground">Due Date</th>
              <th className="px-5 py-3 text-left text-muted-foreground">Source</th>
              <th className="px-5 py-3 text-left text-muted-foreground" />
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-border transition-colors last:border-0 hover:bg-accent/50">
                <td className="px-5 py-4">{task.title}</td>
                <td className="px-5 py-4">
                  <PriorityBadge priority={task.priority as TaskPriority} />
                </td>
                <td className="px-5 py-4">
                  <button type="button" onClick={() => void onCycleTask(task)} disabled={isMutating} className="disabled:opacity-60">
                    <StatusBadge status={task.status} />
                  </button>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{task.assignee}</td>
                <td className="px-5 py-4 text-muted-foreground">{new Date(task.due).toLocaleDateString()}</td>
                <td className="px-5 py-4 text-muted-foreground capitalize">{task.source}</td>
                <td className="px-5 py-4">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
