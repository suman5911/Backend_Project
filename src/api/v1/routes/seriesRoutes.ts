import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { seriesSchemas } from "../validation/seriesSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
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
router.post("/series", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(seriesSchemas.create), createSeries);
router.put("/series/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(seriesSchemas.update), updateSeries);
router.delete("/series/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(seriesSchemas.delete), deleteSeries);

export default router;