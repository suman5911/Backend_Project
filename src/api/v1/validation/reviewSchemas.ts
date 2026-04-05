import Joi from "joi";

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