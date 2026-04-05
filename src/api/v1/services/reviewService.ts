import { Review } from "../models/reviewModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const REVIEWS_COLLECTION = "reviews";

/**
 * Retrieves all reviews from Firestore
 * @returns Promise resolving to array of reviews
 */
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const snapshot = await firestoreRepository.getDocuments(REVIEWS_COLLECTION);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Review));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get reviews: ${errorMessage}`);
  }
};

/**
 * Retrieves a single review by ID from Firestore
 * @param id - Review ID
 * @returns Promise resolving to review or null
 */
export const getReviewById = async (id: string): Promise<Review | null> => {
  try {
    const doc = await firestoreRepository.getDocumentById(REVIEWS_COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Review;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get review: ${errorMessage}`);
  }
};

/**
 * Creates a new review in Firestore
 * @param review - Review data
 * @returns Promise resolving to created review
 */
export const createReview = async (review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<Review> => {
  try {
    const newReview = {
      ...review,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = await firestoreRepository.createDocument<Review>(REVIEWS_COLLECTION, newReview);
    return { id, ...newReview };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create review: ${errorMessage}`);
  }
};

/**
 * Updates an existing review in Firestore
 * @param id - Review ID
 * @param review - Updated review data
 * @returns Promise resolving to updated review or null
 */
export const updateReview = async (id: string, review: Partial<Review>): Promise<Review | null> => {
  try {
    const existing = await getReviewById(id);
    if (!existing) return null;
    const updatedReview = { ...review, updatedAt: new Date() };
    await firestoreRepository.updateDocument<Review>(REVIEWS_COLLECTION, id, updatedReview);
    return { ...existing, ...updatedReview };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update review: ${errorMessage}`);
  }
};

/**
 * Deletes a review from Firestore
 * @param id - Review ID
 * @returns Promise resolving to deleted review or null
 */
export const deleteReview = async (id: string): Promise<Review | null> => {
  try {
    const existing = await getReviewById(id);
    if (!existing) return null;
    await firestoreRepository.deleteDocument(REVIEWS_COLLECTION, id);
    return existing;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete review: ${errorMessage}`);
  }
};