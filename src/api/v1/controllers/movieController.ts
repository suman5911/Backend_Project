import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import * as movieService from "../services/movieService";

/**
 * Retrieves all movies
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(HTTP_STATUS.OK).json(successResponse(movies, "Movies retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve movies" });
  }
};

/**
 * Retrieves a single movie by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(movie, "Movie retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve movie" });
  }
};

/**
 * Creates a new movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse(movie, "Movie created successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to create movie" });
  }
};

/**
 * Updates an existing movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await movieService.updateMovie(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(updated, "Movie updated successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to update movie" });
  }
};

/**
 * Deletes a movie
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await movieService.deleteMovie(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Movie not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Movie deleted successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete movie" });
  }
};