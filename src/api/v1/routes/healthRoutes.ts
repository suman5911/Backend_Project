import express, { Router, Request, Response } from "express";

/**
 * Represents the response structure for a health check endpoint
 */
interface HealthCheckResponse {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
}

const router: Router = express.Router();

// Health check endpoint
router.get("/health", (req: Request, res: Response): void => {
  // Create a response object that matches our interface
  const healthData: HealthCheckResponse = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };
  res.json(healthData);
});

export default router;