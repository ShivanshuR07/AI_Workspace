import { Router } from "express";
import { activity } from "../../shared/mock-data.js";

export const activityRouter = Router();

activityRouter.get("/status", (_req, res) => {
  res.json({ module: "activity", status: "ready" });
});

activityRouter.get("/", (_req, res) => {
  res.json({ activity });
});
