/**
 * Represents a review in the system
 */
export interface Review {
  id: string;
  targetId: string;
  targetType: string;
  rating: number;
  comment: string;
}