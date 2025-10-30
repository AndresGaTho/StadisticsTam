export interface RefereeRating {
  refereeId: number;
  rating: number; // 1-5 estrellas
  comments?: string;
  timestamp: Date;
  raterId?: number; // ID de quien califica
}