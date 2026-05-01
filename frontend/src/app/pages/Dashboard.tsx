import { ArrowRight, FileText, Mail, Plus, Video } from "lucide-react";
import { Link } from "react-router";
import { MetricCard } from "../components/MetricCard";
import { PriorityBadge } from "../components/PriorityBadge";
import { StateBlock } from "../components/StateBlock";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { api } from "../lib/api";

const quickActions = [
  { label: "Create Document", icon: FileText, route: "/documents" },
  { label: "Schedule Meeting", icon: Video, route: "/meetings" },
  { label: "Draft Email", icon: Mail, route: "/email" },
  { label: "Add Task", icon: Plus, route: "/tasks" },
];

export function Dashboard() {
  const { data, error, isLoading, reload } = useAsyncResource(api.dashboard, []);

  if (isLoading) {
    return <StateBlock title="Loading workspace" description="Collecting tasks, activity, and AI insights." variant="loading" />;
  }

  if (error || !data) {
    return (
      <StateBlock
        title="Dashboard unavailable"
        description={error ?? "The workspace API did not return dashboard data."}
        actionLabel="Retry"
        onAction={reload}
        variant="error"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.route}
              className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Icon className="h-4 w-4" />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3>AI Insights</h3>
          <Link to="/history" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            View history
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {data.insights.length ? (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {data.insights.map((insight) => (
              <Link key={insight.id} to={insight.route} className="rounded-lg bg-muted p-4 transition-colors hover:bg-accent">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>{insight.title}</div>
                  <span className="shrink-0 rounded bg-primary/10 px-2 py-1 text-xs text-primary">{insight.confidence}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{insight.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <StateBlock title="No insights yet" description="AI insights will appear after documents, emails, or meetings are processed." />
        )}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3>Recent Activity</h3>
            <Link to="/history" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {data.activity.length ? (
            <div className="space-y-4">
              {data.activity.map((item) => (
                <Link key={item.id} to={item.route} className="flex items-start justify-between gap-3 rounded-lg p-2 hover:bg-accent">
                  <div>
                    <div>{item.action}</div>
                    <div className="text-sm text-muted-foreground">{item.item}</div>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">{item.time}</span>
                </Link>
              ))}
            </div>
          ) : (
            <StateBlock title="No activity yet" description="Workspace events will appear here as your team works." />
          )}
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3>Pending Tasks</h3>
            <Link to="/tasks" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {data.tasks.length ? (
            <div className="space-y-4">
              {data.tasks.map((task) => (
                <Link key={task.id} to="/tasks" className="flex items-start justify-between gap-3 rounded-lg p-2 hover:bg-accent">
                  <div>
                    <div>{task.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.assignee} · Due {new Date(task.due).toLocaleDateString()}
                    </div>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </Link>
              ))}
            </div>
          ) : (
            <StateBlock title="No pending tasks" description="Completed work is clear here. New AI-extracted tasks will show up automatically." />
          )}
        </section>
      </div>
    </div>
  );
}
