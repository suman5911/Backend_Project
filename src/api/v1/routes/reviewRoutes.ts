import express, { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

const router: Router = express.Router();

router.get("/reviews", getAllReviews);
router.get("/reviews/:id", getReviewById);
router.post("/reviews", createReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;