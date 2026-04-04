import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";

// Initialize Express application
const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);

export default app;