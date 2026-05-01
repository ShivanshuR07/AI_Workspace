import { Router } from "express";

export const insightsRouter = Router();

insightsRouter.get("/status", (_req, res) => {
  res.json({ module: "insights", status: "ready" });
});
