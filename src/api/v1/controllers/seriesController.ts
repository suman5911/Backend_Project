import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as seriesService from "../services/seriesService";

/**
 * Retrieves all series
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllSeries = (req: Request, res: Response): void => {
  try {
    const series = seriesService.getAllSeries();
    res.status(HTTP_STATUS.OK).json({
      message: "Series retrieved successfully",
      data: series,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve series",
    });
  }
};

/**
 * Retrieves a single series by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getSeriesById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const series = seriesService.getSeriesById(id);
    if (!series) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Series retrieved successfully",
      data: series,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve series",
    });
  }
};

/**
 * Creates a new series
 * @param req - Express request object
 * @param res - Express response object
 */
export const createSeries = (req: Request, res: Response): void => {
  try {
    const series = seriesService.createSeries(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Series created successfully",
      data: series,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create series",
    });
  }
};

/**
 * Updates an existing series
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateSeries = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updated = seriesService.updateSeries(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Series updated successfully",
      data: updated,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update series",
    });
  }
};

/**
 * Deletes a series
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteSeries = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = seriesService.deleteSeries(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Series deleted successfully",
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete series",
    });
  }
};