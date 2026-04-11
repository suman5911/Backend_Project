import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
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
router.post("/reviews", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), validateRequest(reviewSchemas.create), createReview);
router.put("/reviews/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), validateRequest(reviewSchemas.update), updateReview);
router.delete("/reviews/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(reviewSchemas.delete), deleteReview);

export default router;