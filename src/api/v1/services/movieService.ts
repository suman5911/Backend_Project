import { Movie } from "../models/movieModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const MOVIES_COLLECTION = "movies";

/**
 * Retrieves all movies from Firestore
 * @returns Promise resolving to array of movies
 */
export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const snapshot = await firestoreRepository.getDocuments(MOVIES_COLLECTION);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Movie));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get movies: ${errorMessage}`);
  }
};

/**
 * Retrieves a single movie by ID from Firestore
 * @param id - Movie ID
 * @returns Promise resolving to movie or null
 */
export const getMovieById = async (id: string): Promise<Movie | null> => {
  try {
    const doc = await firestoreRepository.getDocumentById(MOVIES_COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Movie;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get movie: ${errorMessage}`);
  }
};

/**
 * Creates a new movie in Firestore
 * @param movie - Movie data
 * @returns Promise resolving to created movie
 */
export const createMovie = async (movie: Omit<Movie, "id">): Promise<Movie> => {
  try {
    const id = await firestoreRepository.createDocument<Movie>(MOVIES_COLLECTION, movie);
    return { id, ...movie };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create movie: ${errorMessage}`);
  }
};

/**
 * Updates an existing movie in Firestore
 * @param id - Movie ID
 * @param movie - Updated movie data
 * @returns Promise resolving to updated movie or null
 */
export const updateMovie = async (id: string, movie: Partial<Movie>): Promise<Movie | null> => {
  try {
    const existing = await getMovieById(id);
    if (!existing) return null;
    await firestoreRepository.updateDocument<Movie>(MOVIES_COLLECTION, id, movie);
    return { ...existing, ...movie };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update movie: ${errorMessage}`);
  }
};

/**
 * Deletes a movie from Firestore
 * @param id - Movie ID
 * @returns Promise resolving to deleted movie or null
 */
export const deleteMovie = async (id: string): Promise<Movie | null> => {
  try {
    const existing = await getMovieById(id);
    if (!existing) return null;
    await firestoreRepository.deleteDocument(MOVIES_COLLECTION, id);
    return existing;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete movie: ${errorMessage}`);
  }
};