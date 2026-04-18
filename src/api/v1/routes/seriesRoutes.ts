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

/**
 * @openapi
 * /series:
 *   get:
 *     summary: Get all series
 *     tags: [Series]
 *     responses:
 *       '200':
 *         description: List of all series
 */
router.get("/series", getAllSeries);

/**
 * @openapi
 * /series/{id}:
 *   get:
 *     summary: Get a single series by ID
 *     tags: [Series]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Series found
 *       '404':
 *         description: Series not found
 */
router.get("/series/:id", validateRequest(seriesSchemas.getById), getSeriesById);

/**
 * @openapi
 * /series:
 *   post:
 *     summary: Create a new series
 *     tags: [Series]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Series'
 *     responses:
 *       '201':
 *         description: Series created successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/series", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(seriesSchemas.create), createSeries);

/**
 * @openapi
 * /series/{id}:
 *   put:
 *     summary: Update a series
 *     tags: [Series]
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
 *         description: Series updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Series not found
 */
router.put("/series/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(seriesSchemas.update), updateSeries);

/**
 * @openapi
 * /series/{id}:
 *   delete:
 *     summary: Delete a series
 *     tags: [Series]
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
 *         description: Series deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Series not found
 */
router.delete("/series/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(seriesSchemas.delete), deleteSeries);

export default router;