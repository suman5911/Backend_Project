import express, { Router } from "express";
import {
  getAllSeries,
  getSeriesById,
  createSeries,
  updateSeries,
  deleteSeries,
} from "../controllers/seriesController";

const router: Router = express.Router();

router.get("/series", getAllSeries);
router.get("/series/:id", getSeriesById);
router.post("/series", createSeries);
router.put("/series/:id", updateSeries);
router.delete("/series/:id", deleteSeries);

export default router;