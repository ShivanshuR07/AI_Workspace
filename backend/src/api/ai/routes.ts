import { Router } from "express";

export const aiRouter = Router();

aiRouter.get("/status", (_req, res) => {
  res.json({ module: "ai", status: "ready" });
});
