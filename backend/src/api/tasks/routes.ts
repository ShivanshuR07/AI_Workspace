import { Router } from "express";

export const tasksRouter = Router();

tasksRouter.get("/status", (_req, res) => {
  res.json({ module: "tasks", status: "ready" });
});
