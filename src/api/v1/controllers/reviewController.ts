import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as reviewService from "../services/reviewService";

/**
 * Retrieves all reviews
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllReviews = (req: Request, res: Response): void => {
  try {
    const reviews = reviewService.getAllReviews();
    res.status(HTTP_STATUS.OK).json({
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve reviews",
    });
  }
};

/**
 * Retrieves a single review by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getReviewById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const review = reviewService.getReviewById(id);
    if (!review) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Review retrieved successfully",
      data: review,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve review",
    });
  }
};

/**
 * Creates a new review
 * @param req - Express request object
 * @param res - Express response object
 */
export const createReview = (req: Request, res: Response): void => {
  try {
    const review = reviewService.createReview(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Review created successfully",
      data: review,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create review",
    });
  }
};

/**
 * Updates an existing review
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateReview = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updated = reviewService.updateReview(id, req.body);
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Review updated successfully",
      data: updated,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update review",
    });
  }
};

/**
 * Deletes a review
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteReview = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = reviewService.deleteReview(id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Review not found" });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Review deleted successfully",
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete review",
    });
  }
};