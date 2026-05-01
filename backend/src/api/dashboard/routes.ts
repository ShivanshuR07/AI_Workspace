import { Router } from "express";

export const dashboardRouter = Router();

dashboardRouter.get("/status", (_req, res) => {
  res.json({ module: "dashboard", status: "ready" });
});
