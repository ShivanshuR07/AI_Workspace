import { Router } from "express";

export const authRouter = Router();

authRouter.get("/status", (_req, res) => {
  res.json({ module: "auth", status: "ready" });
});
