import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { seriesSchemas } from "../validation/seriesSchemas";
import {
  getAllSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
} from "../controllers/seriesController";

const router: Router = express.Router();

router.get("/series", getAllSeries);
router.get("/series/:id", validateRequest(seriesSchemas.getById), getSeriesById);
router.post("/series", validateRequest(seriesSchemas.create), createSeries);
router.put("/series/:id", validateRequest(seriesSchemas.update), updateSeries);
router.delete("/series/:id", validateRequest(seriesSchemas.delete), deleteSeries);

export default router;