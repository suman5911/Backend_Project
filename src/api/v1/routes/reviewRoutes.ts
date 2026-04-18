import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { reviewSchemas } from "../validation/reviewSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from "../controllers/reviewController";

const router: Router = express.Router();

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       '200':
 *         description: List of all reviews
 */
router.get("/reviews", getAllReviews);

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     summary: Get a single review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Review found
 *       '404':
 *         description: Review not found
 */
router.get("/reviews/:id", validateRequest(reviewSchemas.getById), getReviewById);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetId:
 *                 type: string
 *               targetType:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Review created successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/reviews", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), validateRequest(reviewSchemas.create), createReview);

/**
 * @openapi
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetId:
 *                 type: string
 *               targetType:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Review not found
 */
router.put("/reviews/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "user"] }), validateRequest(reviewSchemas.update), updateReview);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Review not found
 */
router.delete("/reviews/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(reviewSchemas.delete), deleteReview);

export default router;