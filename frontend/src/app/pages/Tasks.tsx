import { Filter, Plus, MoreVertical, LayoutGrid } from "lucide-react";
import { useState } from "react";

const tasks = [
  { id: 1, title: "Review Q1 financial report", priority: "High", status: "In Progress", assignee: "Sarah Chen", due: "Apr 8, 2026" },
  { id: 2, title: "Prepare presentation slides", priority: "Medium", status: "Not Started", assignee: "Mike Roberts", due: "Apr 9, 2026" },
  { id: 3, title: "Update project timeline", priority: "Low", status: "In Progress", assignee: "Lisa Park", due: "Apr 12, 2026" },
  { id: 4, title: "Schedule client call", priority: "High", status: "Not Started", assignee: "Tom Wilson", due: "Apr 8, 2026" },
  { id: 5, title: "Review contracts", priority: "Medium", status: "Completed", assignee: "Emma Davis", due: "Apr 7, 2026" },
  { id: 6, title: "Finalize budget allocation", priority: "High", status: "In Progress", assignee: "Sarah Chen", due: "Apr 10, 2026" },
  { id: 7, title: "Conduct user interviews", priority: "Low", status: "Not Started", assignee: "Mike Roberts", due: "Apr 15, 2026" },
  { id: 8, title: "Update documentation", priority: "Medium", status: "In Progress", assignee: "Lisa Park", due: "Apr 11, 2026" },
];

const statusOptions = ["All", "Not Started", "In Progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];

export function Tasks() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Filters:</span>
          </div>
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 h-9 rounded-lg transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex gap-2">
            {priorityOptions.map((priority) => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`px-3 h-9 rounded-lg transition-colors ${
                  priorityFilter === priority
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 h-9 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
            <LayoutGrid className="w-4 h-4" />
            Kanban
          </button>
          <button className="flex items-center gap-2 px-4 h-9 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr className="border-b border-border">
                <th className="text-left py-3 px-6 text-muted-foreground">
                  <input type="checkbox" />
                </th>
                <th className="text-left py-3 px-6 text-muted-foreground">Task</th>
                <th className="text-left py-3 px-6 text-muted-foreground">Priority</th>
                <th className="text-left py-3 px-6 text-muted-foreground">Status</th>
                <th className="text-left py-3 px-6 text-muted-foreground">Assignee</th>
                <th className="text-left py-3 px-6 text-muted-foreground">Due Date</th>
                <th className="text-left py-3 px-6 text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="py-4 px-6">
                    <input type="checkbox" />
                  </td>
                  <td className="py-4 px-6">{task.title}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{task.assignee}</td>
                  <td className="py-4 px-6 text-muted-foreground">{task.due}</td>
                  <td className="py-4 px-6">
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional Kanban Strip */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4">Quick Kanban View</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-muted-foreground mb-2">Not Started ({tasks.filter((t) => t.status === "Not Started").length})</div>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === "Not Started")
                .slice(0, 2)
                .map((task) => (
                  <div key={task.id} className="bg-muted p-3 rounded-lg">
                    <div className="mb-1">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.assignee}</div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2">In Progress ({tasks.filter((t) => t.status === "In Progress").length})</div>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === "In Progress")
                .slice(0, 2)
                .map((task) => (
                  <div key={task.id} className="bg-muted p-3 rounded-lg">
                    <div className="mb-1">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.assignee}</div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-2">Completed ({tasks.filter((t) => t.status === "Completed").length})</div>
            <div className="space-y-2">
              {tasks
                .filter((t) => t.status === "Completed")
                .slice(0, 2)
                .map((task) => (
                  <div key={task.id} className="bg-muted p-3 rounded-lg">
                    <div className="mb-1">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.assignee}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
