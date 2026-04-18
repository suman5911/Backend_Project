import Joi from "joi";
/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - releaseYear
 *         - description
 *         - rating
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a movie
 *           example: "abc123"
 *         title:
 *           type: string
 *           description: The title of the movie
 *           example: "Inception"
 *         genre:
 *           type: string
 *           description: The genre of the movie
 *           example: "Sci-Fi"
 *         releaseYear:
 *           type: number
 *           description: The release year of the movie
 *           example: 2010
 *         description:
 *           type: string
 *           description: A brief description of the movie
 *           example: "A mind-bending thriller"
 *         rating:
 *           type: number
 *           description: The rating of the movie out of 10
 *           example: 8.8
 */

// Movie operation schemas organized by request part
export const movieSchemas = {
  // POST /movies - Create new movie
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
      releaseYear: Joi.number().integer().required().messages({
        "any.required": "Release year is required",
        "number.base": "Release year must be a number",
      }),
      description: Joi.string().required().messages({
        "any.required": "Description is required",
        "string.empty": "Description cannot be empty",
      }),
      rating: Joi.number().min(0).max(10).required().messages({
        "any.required": "Rating is required",
        "number.min": "Rating must be at least 0",
        "number.max": "Rating must be at most 10",
      }),
    }),
  },
  // GET /movies/:id - Get single movie
  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Movie ID is required",
        "string.empty": "Movie ID cannot be empty",
      }),
    }),
  },
  // PUT /movies/:id - Update movie
  update: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Movie ID is required",
        "string.empty": "Movie ID cannot be empty",
      }),
    }),
    body: Joi.object({
      title: Joi.string().optional(),
      genre: Joi.string().optional(),
      releaseYear: Joi.number().integer().optional(),
      description: Joi.string().optional(),
      rating: Joi.number().min(0).max(10).optional(),
    }),
  },
  // DELETE /movies/:id - Delete movie
  delete: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Movie ID is required",
        "string.empty": "Movie ID cannot be empty",
      }),
    }),
  },
};