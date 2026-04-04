import { Router, Request, Response } from "express";

const router = Router();

/**
 * @route GET /health
 * @description Health check endpoint
 * @returns {object} 200 - Server status
 */
router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
});

export default router;