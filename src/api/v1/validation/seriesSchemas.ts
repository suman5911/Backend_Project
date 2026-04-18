import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Series:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - seasons
 *         - status
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a series
 *           example: "xyz789"
 *         title:
 *           type: string
 *           description: The title of the series
 *           example: "Breaking Bad"
 *         genre:
 *           type: string
 *           description: The genre of the series
 *           example: "Drama"
 *         seasons:
 *           type: number
 *           description: The number of seasons
 *           example: 5
 *         status:
 *           type: string
 *           enum: [ongoing, ended]
 *           description: The current status of the series
 *           example: "ended"
 *         description:
 *           type: string
 *           description: A brief description of the series
 *           example: "A chemistry teacher turned drug manufacturer."
 */

// Series operation schemas organized by request part
export const seriesSchemas = {
  // POST /series - Create new series
  create: {
    body: Joi.object({
      title: Joi.string().required().messages({
        "any.required": "Title is required",
        "string.empty": "Title cannot be empty",
      }),
      genre: Joi.string().required().messages({
        "any.required": "Genre is required",
        "string.empty": "Genre cannot be empty",
      }),
      seasons: Joi.number().integer().min(1).required().messages({
        "any.required": "Seasons is required",
        "number.base": "Seasons must be a number",
        "number.min": "Seasons must be at least 1",
      }),
      status: Joi.string().valid("ongoing", "ended").required().messages({
        "any.required": "Status is required",
        "any.only": "Status must be either ongoing or ended",
      }),
      description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
      }),
    }),
  },
  // GET /series/:id - Get single series
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Series ID is required",
        "string.empty": "Series ID cannot be empty",
      }),
    }),
  },
  // PUT /series/:id - Update series
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Series ID is required",
        "string.empty": "Series ID cannot be empty",
      }),
    }),
    body: Joi.object({
      title: Joi.string().optional(),
      genre: Joi.string().optional(),
      seasons: Joi.number().integer().min(1).optional(),
      status: Joi.string().valid("ongoing", "ended").optional(),
      description: Joi.string().optional(),
    }),
  },
  // DELETE /series/:id - Delete series
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Series ID is required",
        "string.empty": "Series ID cannot be empty",
      }),
    }),
  },
};