import express, { Express } from "express";
import morgan from "morgan";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import movieRoutes from "./api/v1/routes/movieRoutes";
import { limiter } from "./config/rateLimiter";
import seriesRoutes from "./api/v1/routes/seriesRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

// Logging middleware - should be applied early
if (process.env.NODE_ENV === "production") {
  // In production, log to files
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  // In development, log to console for immediate feedback
  app.use(consoleLogger);
}

// Middleware to parse JSON
app.use(express.json());
app.use(limiter);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Routes
app.use("/api/v1", movieRoutes);
app.use("/api/v1", seriesRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global error handler - must be last
app.use(errorHandler);

export default app;