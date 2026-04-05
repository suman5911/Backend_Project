import { Series } from "../models/seriesModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const SERIES_COLLECTION = "series";

/**
 * Retrieves all series from Firestore
 * @returns Promise resolving to array of series
 */
export const getAllSeries = async (): Promise<Series[]> => {
  try {
    const snapshot = await firestoreRepository.getDocuments(SERIES_COLLECTION);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Series));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get series: ${errorMessage}`);
  }
};

/**
 * Retrieves a single series by ID from Firestore
 * @param id - Series ID
 * @returns Promise resolving to series or null
 */
export const getSeriesById = async (id: string): Promise<Series | null> => {
  try {
    const doc = await firestoreRepository.getDocumentById(SERIES_COLLECTION, id);
    if (!doc) return null;
    return { id: doc.id, ...doc.data() } as Series;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get series: ${errorMessage}`);
  }
};

/**
 * Creates a new series in Firestore
 * @param series - Series data
 * @returns Promise resolving to created series
 */
export const createSeries = async (series: Omit<Series, "id">): Promise<Series> => {
  try {
    const id = await firestoreRepository.createDocument<Series>(SERIES_COLLECTION, series);
    return { id, ...series };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create series: ${errorMessage}`);
  }
};

/**
 * Updates an existing series in Firestore
 * @param id - Series ID
 * @param series - Updated series data
 * @returns Promise resolving to updated series or null
 */
export const updateSeries = async (id: string, series: Partial<Series>): Promise<Series | null> => {
  try {
    const existing = await getSeriesById(id);
    if (!existing) return null;
    await firestoreRepository.updateDocument<Series>(SERIES_COLLECTION, id, series);
    return { ...existing, ...series };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update series: ${errorMessage}`);
  }
};

/**
 * Deletes a series from Firestore
 * @param id - Series ID
 * @returns Promise resolving to deleted series or null
 */
export const deleteSeries = async (id: string): Promise<Series | null> => {
  try {
    const existing = await getSeriesById(id);
    if (!existing) return null;
    await firestoreRepository.deleteDocument(SERIES_COLLECTION, id);
    return existing;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete series: ${errorMessage}`);
  }
};