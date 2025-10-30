export interface TeamRating {
  teamId: number;
  matchId: number;
  overallRating: number; // 1-5 estrellas
  fairness: number; // 1-5
  professionalism: number; // 1-5
  comments: string;
  signature?: string; // Firma electrónica
  timestamp: Date;
}