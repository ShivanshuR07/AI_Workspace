import { Router } from "express";

export const activityRouter = Router();

activityRouter.get("/status", (_req, res) => {
  res.json({ module: "activity", status: "ready" });
});
