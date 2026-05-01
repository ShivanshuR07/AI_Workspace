import { Router } from "express";
import { activity, insights, tasks } from "../../shared/mock-data.js";

export const dashboardRouter = Router();

dashboardRouter.get("/status", (_req, res) => {
  res.json({ module: "dashboard", status: "ready" });
});

dashboardRouter.get("/overview", (_req, res) => {
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const activeTasks = tasks.filter((task) => task.status !== "Completed").length;
  const dueToday = tasks.filter((task) => task.due === "2026-05-02" && task.status !== "Completed").length;
  const highPriority = tasks.filter((task) => task.priority === "High" && task.status !== "Completed").length;

  res.json({
    metrics: [
      {
        label: "Open Tasks",
        value: activeTasks.toString(),
        detail: `${completedTasks} completed this week`,
        trend: activeTasks <= 4 ? "up" : "down",
      },
      {
        label: "Due Today",
        value: dueToday.toString(),
        detail: "Pulled from tasks and AI extractions",
        trend: dueToday > 0 ? "down" : "up",
      },
      {
        label: "AI Insights",
        value: insights.length.toString(),
        detail: "New recommendations ready",
        trend: "up",
      },
      {
        label: "High Priority",
        value: highPriority.toString(),
        detail: "Needs owner review",
        trend: highPriority > 0 ? "down" : "up",
      },
    ],
    activity,
    tasks: tasks.filter((task) => task.status !== "Completed").slice(0, 4),
    insights,
  });
});
