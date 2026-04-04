/**
 * In-memory storage for reviews
 */
let reviews: { id: string; targetId: string; targetType: string; rating: number; comment: string }[] = [];

/**
 * Retrieves all reviews
 * @returns Array of all reviews
 */
export const getAllReviews = () => {
  return reviews;
};

/**
 * Retrieves a single review by ID
 * @param id - Review ID
 * @returns Review object or undefined
 */
export const getReviewById = (id: string) => {
  return reviews.find((r) => r.id === id);
};

/**
 * Creates a new review
 * @param review - Review data
 * @returns Created review
 */
export const createReview = (review: { targetId: string; targetType: string; rating: number; comment: string }) => {
  const newReview = { id: Date.now().toString(), ...review };
  reviews.push(newReview);
  return newReview;
};

/**
 * Updates an existing review
 * @param id - Review ID
 * @param review - Updated review data
 * @returns Updated review or undefined
 */
export const updateReview = (id: string, review: { targetId: string; targetType: string; rating: number; comment: string }) => {
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return undefined;
  reviews[index] = { id, ...review };
  return reviews[index];
};

/**
 * Deletes a review
 * @param id - Review ID
 * @returns Deleted review or undefined
 */
export const deleteReview = (id: string) => {
  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return undefined;
  const deleted = reviews[index];
  reviews.splice(index, 1);
  return deleted;
};