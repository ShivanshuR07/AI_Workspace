import { Router } from "express";

export const emailsRouter = Router();

emailsRouter.get("/status", (_req, res) => {
  res.json({ module: "emails", status: "ready" });
});
