import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validation/movieSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController";

const router: Router = express.Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       '200':
 *         description: List of all movies
 */
router.get("/movies", getAllMovies);

/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get a single movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Movie found
 *       '404':
 *         description: Movie not found
 */
router.get("/movies/:id", validateRequest(movieSchemas.getById), getMovieById);

/**
 * @openapi
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '201':
 *         description: Movie created successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post("/movies", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(movieSchemas.create), createMovie);

/**
 * @openapi
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
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
 *         description: Movie updated successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Movie not found
 */
router.put("/movies/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(movieSchemas.update), updateMovie);

/**
 * @openapi
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
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
 *         description: Movie deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Movie not found
 */
router.delete("/movies/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(movieSchemas.delete), deleteMovie);

export default router;