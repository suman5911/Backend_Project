import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

// Middleware to parse JSON
app.use(express.json());

export default app;