import { Router } from "express";

export const meetingsRouter = Router();

meetingsRouter.get("/status", (_req, res) => {
  res.json({ module: "meetings", status: "ready" });
});
