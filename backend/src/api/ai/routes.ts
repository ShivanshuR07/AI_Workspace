import { Router } from "express";
import { z } from "zod";

export const aiRouter = Router();

aiRouter.get("/status", (_req, res) => {
  res.json({ module: "ai", status: "ready" });
});

aiRouter.post("/command", (req, res) => {
  const { prompt } = z.object({ prompt: z.string().min(1) }).parse(req.body);
  const normalized = prompt.toLowerCase();

  const suggestions = [
    normalized.includes("task") ? "Create a task from this request" : "Search across workspace context",
    normalized.includes("meeting") ? "Open recent meeting summaries" : "Summarize relevant documents",
    normalized.includes("email") ? "Draft a follow-up email" : "Find related tasks and owners",
  ];

  res.json({
    answer: `AI command received: "${prompt}".`,
    suggestions,
  });
});
