import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validation/movieSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from "../controllers/movieController";

const router: Router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", validateRequest(movieSchemas.getById), getMovieById);
router.post("/movies", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(movieSchemas.create), createMovie);
router.put("/movies/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"] }), validateRequest(movieSchemas.update), updateMovie);
router.delete("/movies/:id", authenticate, isAuthorized({ hasRole: ["admin"] }), validateRequest(movieSchemas.delete), deleteMovie);

export default router;