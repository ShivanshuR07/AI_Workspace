import { AlertTriangle, CheckCircle2, Lightbulb, ListTodo, TrendingDown, TrendingUp } from "lucide-react";
import type { DashboardMetric } from "../lib/api";

const metricIcons = [ListTodo, AlertTriangle, Lightbulb, CheckCircle2];

export function MetricCard({ metric, index }: { metric: DashboardMetric; index: number }) {
  const Icon = metricIcons[index % metricIcons.length];
  const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
  const trendClassName = metric.trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">{metric.label}</span>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="text-2xl">{metric.value}</div>
      <div className={`mt-2 flex items-center gap-1 text-sm ${trendClassName}`}>
        <TrendIcon className="h-4 w-4" />
        <span>{metric.detail}</span>
      </div>
    </div>
  );
}
