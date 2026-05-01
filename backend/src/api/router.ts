import { Router } from "express";

import { activityRouter } from "./activity/routes.js";
import { aiRouter } from "./ai/routes.js";
import { authRouter } from "./auth/routes.js";
import { dashboardRouter } from "./dashboard/routes.js";
import { documentsRouter } from "./documents/routes.js";
import { emailsRouter } from "./emails/routes.js";
import { insightsRouter } from "./insights/routes.js";
import { meetingsRouter } from "./meetings/routes.js";
import { tasksRouter } from "./tasks/routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/documents", documentsRouter);
apiRouter.use("/meetings", meetingsRouter);
apiRouter.use("/emails", emailsRouter);
apiRouter.use("/tasks", tasksRouter);
apiRouter.use("/insights", insightsRouter);
apiRouter.use("/activity", activityRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/dashboard", dashboardRouter);
