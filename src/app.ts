import express, { Express } from "express";
import morgan from "morgan";
import healthRoutes from "./api/v1/routes/healthRoutes";
import movieRoutes from "./api/v1/routes/movieRoutes";
import seriesRoutes from "./api/v1/routes/seriesRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";

// Initialize Express application
const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1", movieRoutes);
app.use("/api/v1", seriesRoutes);
app.use("/api/v1", reviewRoutes);

export default app;