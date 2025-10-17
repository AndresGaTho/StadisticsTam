import { MatchTeam } from './MatchTeam';

export interface Match {
  id: number;
  field: string;
  time: string;
  teamA: MatchTeam;
  teamB: MatchTeam;
  status: 'scheduled' | 'live' | 'finished';
  scoreA: number;
  scoreB: number;
  category: 'varonil' | 'femenil' | 'mixto';
  idCategory: number;
}
