# New Component Plan

## Component: Express Rate Limiter

## What is it?
`express-rate-limit` is a middleware package that limits how many requests a single IP can make to the API within a set time window.

## Why this one?
Honestly it just makes sense for this project. A Movies and Series API is going to have open endpoints that anyone can hit. Without any limiting, someone could spam requests and take the server down. Rate limiting fixes that without touching any of the actual business logic.

## How I'm planning to use it?
Apply it globally across all endpoints. Each IP gets 100 requests per 15 minutes. Hit the limit and you get a `429 Too Many Requests` back. Simple.

## Integration Steps
- Install: `npm install express-rate-limit`
- Create config in `config/rateLimiter.ts`
- Plug it into `src/app.ts` before the routes

## Example Setup
```typescript
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later."
  }
});
```

## Why it fits?
It protects the API without complicating anything. One config file, one line in app.ts, done.