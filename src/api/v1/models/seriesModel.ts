/**
 * Represents a series in the system
 */
export interface Series {
  id: string;
  title: string;
  genre: string;
  seasons: number;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}