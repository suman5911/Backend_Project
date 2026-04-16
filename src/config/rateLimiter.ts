import rateLimit from "express-rate-limit";

/**
 * Rate limiter configuration
 * Limits each IP to 100 requests per 15 minutes
 */
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});