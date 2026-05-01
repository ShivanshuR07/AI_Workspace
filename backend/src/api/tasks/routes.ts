import { Router } from "express";
import { z } from "zod";
import { tasks } from "../../shared/mock-data.js";

export const tasksRouter = Router();

tasksRouter.get("/status", (_req, res) => {
  res.json({ module: "tasks", status: "ready" });
});

tasksRouter.get("/", (req, res) => {
  const status = typeof req.query.status === "string" ? req.query.status : "All";
  const priority = typeof req.query.priority === "string" ? req.query.priority : "All";

  res.json({
    tasks: tasks.filter((task) => {
      const statusMatches = status === "All" || task.status === status;
      const priorityMatches = priority === "All" || task.priority === priority;
      return statusMatches && priorityMatches;
    }),
  });
});

tasksRouter.patch("/:id", (req, res) => {
  const body = z.object({ status: z.enum(["Not Started", "In Progress", "Completed"]) }).parse(req.body);
  const task = tasks.find((item) => item.id === Number(req.params.id));

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  task.status = body.status;
  res.json({ task });
});

tasksRouter.post("/", (req, res) => {
  const body = z
    .object({
      title: z.string().min(1),
      priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
      assignee: z.string().default("Unassigned"),
      due: z.string().default("2026-05-09"),
    })
    .parse(req.body);

  const task = {
    id: Math.max(...tasks.map((item) => item.id)) + 1,
    status: "Not Started" as const,
    source: "manual" as const,
    ...body,
  };

  tasks.unshift(task);
  res.status(201).json({ task });
});
