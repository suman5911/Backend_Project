import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import * as reviewService from "../services/reviewService";

/**
 * Retrieves all reviews
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(HTTP_STATUS.OK).json(successResponse(reviews, "Reviews retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve reviews" });
  }
};

/**
 * Retrieves a single review by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const review = await reviewService.getReviewById(id);
    if (!review) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(review, "Review retrieved successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve review" });
  }
};

/**
 * Creates a new review
 * @param req - Express request object
 * @param res - Express response object
 */
export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(HTTP_STATUS.CREATED).json(successResponse(review, "Review created successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to create review" });
  }
};

/**
 * Updates an existing review
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await reviewService.updateReview(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse(updated, "Review updated successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to update review" });
  }
};

/**
 * Deletes a review
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await reviewService.deleteReview(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Review deleted successfully"));
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Failed to delete review" });
  }
};