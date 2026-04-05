import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

const router: Router = express.Router();

router.get("/reviews", getAllReviews);
router.get("/reviews/:id", validateRequest(reviewSchemas.getById), getReviewById);
router.post("/reviews", validateRequest(reviewSchemas.create), createReview);
router.put("/reviews/:id", validateRequest(reviewSchemas.update), updateReview);
router.delete("/reviews/:id", validateRequest(reviewSchemas.delete), deleteReview);

export default router;