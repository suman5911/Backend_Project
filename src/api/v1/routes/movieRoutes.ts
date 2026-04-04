import express, { Router } from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const router: Router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;