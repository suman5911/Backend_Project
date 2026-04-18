import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import cors from "cors";
import { getCorsOptions } from "./config/corsConfig";
import { getHelmetConfig } from "./config/helmetConfig";
import { limiter } from "./config/rateLimiter";
import setupSwagger from "./config/swagger";
import {
  accessLogger,
  errorLogger,
  consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import movieRoutes from "./api/v1/routes/movieRoutes";
import seriesRoutes from "./api/v1/routes/seriesRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import healthRoutes from "./api/v1/routes/healthRoutes";

// Initialize Express application
const app: Express = express();

// Logging middleware - should be applied early
if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);
}

// Security middleware
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

// Rate limiting
app.use(limiter);

// Body parsing
app.use(express.json());

// Swagger documentation
setupSwagger(app);

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1", movieRoutes);
app.use("/api/v1", seriesRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

// Global error handler - must be last
app.use(errorHandler);

export default app;