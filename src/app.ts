import express, { Express } from "express";
import healthRoutes from "./api/v1/routes/healthRoutes";

// Initialize Express application
const app: Express = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);

export default app;