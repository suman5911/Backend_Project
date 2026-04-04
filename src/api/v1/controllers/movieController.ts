import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as movieService from "../services/movieService";

/**
 * Retrieves all movies
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllMovies = (req: Request, res: Response): void => {
  try {
    const movies = movieService.getAllMovies();
    res.status(HTTP_STATUS.OK).json({
      message: "Movies retrieved successfully",
      data: movies,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve movies",
    });
  }
};

/**
 * Retrieves a single movie by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getMovieById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const movie = movieService.getMovieById(id);
    if (!movie) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Movie retrieved successfully",
      data: movie,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve movie",
    });
  }
};

/**
 * Creates a new movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const createMovie = (req: Request, res: Response): void => {
  try {
    const movie = movieService.createMovie(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create movie",
    });
  }
};

/**
 * Updates an existing movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateMovie = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updated = movieService.updateMovie(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Movie updated successfully",
      data: updated,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update movie",
    });
  }
};

/**
 * Deletes a movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteMovie = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = movieService.deleteMovie(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Movie deleted successfully",
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete movie",
    });
  }
};