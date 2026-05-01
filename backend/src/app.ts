import cors from "cors";
import express from "express";

import { apiRouter } from "./api/router.js";
import { errorHandler } from "./shared/middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use("/api", apiRouter);
  app.use(errorHandler);

  return app;
}
