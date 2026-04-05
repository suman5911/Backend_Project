import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import * as seriesService from "../services/seriesService";

/**
 * Retrieves all series
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const series = await seriesService.getAllSeries();
    res.status(HTTP_STATUS.OK).json(successResponse(series, "Series retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve series" });
  }
};

/**
 * Retrieves a single series by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getSeriesById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const series = await seriesService.getSeriesById(id);
    if (!series) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(series, "Series retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve series" });
  }
};

/**
 * Creates a new series
 * @param req - Express request object
 * @param res - Express response object
 */
export const createSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const series = await seriesService.createSeries(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse(series, "Series created successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to create series" });
  }
};

/**
 * Updates an existing series
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await seriesService.updateSeries(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(updated, "Series updated successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to update series" });
  }
};

/**
 * Deletes a series
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteSeries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await seriesService.deleteSeries(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Series not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Series deleted successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete series" });
  }
};