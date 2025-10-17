import { Player } from './Player';

export interface PlayerStats {
  playerId: number;
  teamId: number;
  idCategory: number;
  pts: number;
  ptd: number;
  int: number;
  sacks: number;
  season: string;
}
export interface PlayerWithStats extends Player {
  stats?: PlayerStats;
}
