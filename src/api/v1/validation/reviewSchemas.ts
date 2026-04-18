import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - targetId
 *         - targetType
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a review
 *           example: "rev456"
 *         targetId:
 *           type: string
 *           description: The ID of the movie or series being reviewed
 *           example: "abc123"
 *         targetType:
 *           type: string
 *           enum: [movie, series]
 *           description: Whether the review is for a movie or series
 *           example: "movie"
 *         rating:
 *           type: number
 *           description: The rating out of 10
 *           example: 9
 *         comment:
 *           type: string
 *           description: The review comment
 *           example: "One of the best sci-fi films ever made."
 */

// Review operation schemas organized by request part
export const reviewSchemas = {
  // POST /reviews - Create new review
  create: {
    body: Joi.object({
      targetId: Joi.string().required().messages({
        "any.required": "Target ID is required",
        "string.empty": "Target ID cannot be empty",
      }),
      targetType: Joi.string().valid("movie", "series").required().messages({
        "any.required": "Target type is required",
        "any.only": "Target type must be either movie or series",
      }),
      rating: Joi.number().min(1).max(10).required().messages({
        "any.required": "Rating is required",
        "number.min": "Rating must be at least 1",
        "number.max": "Rating must be at most 10",
      }),
      comment: Joi.string().required().messages({
        "any.required": "Comment is required",
        "string.empty": "Comment cannot be empty",
      }),
    }),
  },
  // GET /reviews/:id - Get single review
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Review ID is required",
        "string.empty": "Review ID cannot be empty",
      }),
    }),
  },
  // PUT /reviews/:id - Update review
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Review ID is required",
        "string.empty": "Review ID cannot be empty",
      }),
    }),
    body: Joi.object({
      targetId: Joi.string().optional(),
      targetType: Joi.string().valid("movie", "series").optional(),
      rating: Joi.number().min(1).max(10).optional(),
      comment: Joi.string().optional(),
    }),
  },
  // DELETE /reviews/:id - Delete review
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Review ID is required",
        "string.empty": "Review ID cannot be empty",
      }),
    }),
  },
};