import { Router } from "express";

export const documentsRouter = Router();

documentsRouter.get("/status", (_req, res) => {
  res.json({ module: "documents", status: "ready" });
});
