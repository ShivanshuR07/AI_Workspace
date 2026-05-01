import { Router } from "express";
import { insights } from "../../shared/mock-data.js";

export const insightsRouter = Router();

insightsRouter.get("/status", (_req, res) => {
  res.json({ module: "insights", status: "ready" });
});

insightsRouter.get("/", (_req, res) => {
  res.json({ insights });
});
