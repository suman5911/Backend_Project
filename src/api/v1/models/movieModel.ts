/**
 * Represents a movie in the system
 */
export interface Movie {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}