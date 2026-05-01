import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Plus, ArrowRight } from "lucide-react";

const overviewCards = [
  { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: DollarSign },
  { label: "Active Users", value: "2,350", change: "+180", trend: "up", icon: Users },
  { label: "Sales", value: "12,234", change: "+19%", trend: "up", icon: ShoppingCart },
  { label: "Active Now", value: "573", change: "-12", trend: "down", icon: Activity },
];

const quickActions = [
  { label: "Create Document", icon: Plus },
  { label: "Schedule Meeting", icon: Plus },
  { label: "Draft Email", icon: Plus },
  { label: "Add Task", icon: Plus },
];

const recentActivity = [
  { action: "Document analyzed", item: "Q4 Report.pdf", time: "2 minutes ago" },
  { action: "Meeting summarized", item: "Team Sync", time: "15 minutes ago" },
  { action: "Email drafted", item: "Client Proposal", time: "1 hour ago" },
  { action: "Task completed", item: "Review contracts", time: "2 hours ago" },
  { action: "Document uploaded", item: "Budget 2026.xlsx", time: "3 hours ago" },
];

const pendingTasks = [
  { task: "Review Q1 financial report", priority: "High", due: "Today" },
  { task: "Prepare presentation slides", priority: "Medium", due: "Tomorrow" },
  { task: "Update project timeline", priority: "Low", due: "This week" },
  { task: "Schedule client call", priority: "High", due: "Today" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <div key={card.label} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">{card.label}</span>
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="mb-1">{card.value}</div>
              <div className={`flex items-center gap-1 text-sm ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                <TrendIcon className="w-4 h-4" />
                <span>{card.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="flex items-center gap-2 px-4 h-10 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Icon className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recent Activity & Pending Tasks */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Recent Activity</h3>
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start justify-between">
                <div>
                  <div className="text-foreground">{item.action}</div>
                  <div className="text-muted-foreground text-sm">{item.item}</div>
                </div>
                <span className="text-muted-foreground text-sm whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Pending Tasks</h3>
            <button className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {pendingTasks.map((item, i) => (
              <div key={i} className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <div className="text-foreground">{item.task}</div>
                    <div className="text-muted-foreground text-sm">Due: {item.due}</div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
