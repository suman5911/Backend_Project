import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { movieSchemas } from "../validation/movieSchemas";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const router: Router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", validateRequest(movieSchemas.getById), getMovieById);
router.post("/movies", validateRequest(movieSchemas.create), createMovie);
router.put("/movies/:id", validateRequest(movieSchemas.update), updateMovie);
router.delete("/movies/:id", validateRequest(movieSchemas.delete), deleteMovie);

export default router;