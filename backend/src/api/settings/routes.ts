import { Router } from "express";
import { z } from "zod";
import { settings, updateSettings } from "../../shared/mock-data.js";

export const settingsRouter = Router();

const settingsSchema = z.object({
  profile: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    role: z.string().min(1),
  }),
  aiPreferences: z.object({
    autoSummaries: z.boolean(),
    emailSuggestions: z.boolean(),
    documentInsights: z.boolean(),
    taskExtraction: z.boolean(),
  }),
  appearance: z.object({
    theme: z.enum(["light", "dark", "auto"]),
  }),
  integrations: z.object({
    gmail: z.boolean(),
    slack: z.boolean(),
    googleDrive: z.boolean(),
  }),
});

settingsRouter.get("/", (_req, res) => {
  res.json({ settings });
});

settingsRouter.put("/", (req, res) => {
  const nextSettings = settingsSchema.parse(req.body);
  res.json({ settings: updateSettings(nextSettings) });
});
