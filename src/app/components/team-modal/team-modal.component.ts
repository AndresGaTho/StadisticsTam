import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from '../../interfaces/Match';
import { CommonModule } from '@angular/common';
import { ScoreControlComponent } from '../score-control/score-control.component';
import { PlayersListComponent } from '../players-list/players-list.component';
import { RefereesListComponent } from '../referees-list/referees-list.component';

@Component({
  selector: 'app-team-modal',
  imports: [CommonModule, ScoreControlComponent, PlayersListComponent,RefereesListComponent],
  templateUrl: './team-modal.component.html',
  styleUrl: './team-modal.component.css',
})
export class TeamModalComponent {
  @Input() visible: boolean = false;
  @Input() team: any;
  @Input() match: Match | null = null;
  @Input() currentScore: number = 0;
  @Input() scoreHistory: any[] = [];
  @Input() hasUnsavedChanges: boolean = false;
  @Input() totalChange: number = 0;
  @Input() lastChange: number = 0;

  @Output() close = new EventEmitter<void>();
  @Output() scoreUpdate = new EventEmitter<{
    points: number;
    manual?: boolean;
  }>();
  @Output() undoScoreChange = new EventEmitter<number>();
  @Output() saveScore = new EventEmitter<void>();

  getWinRate(team: any): string {
    const totalGames = team.wins + team.losses;
    return totalGames > 0 ? ((team.wins / totalGames) * 100).toFixed(1) : '0.0';
  }

  getOpponentTeam(): any {
    if (!this.match || !this.team) return null;
    return this.match.teamA.id === this.team.id
      ? this.match.teamB
      : this.match.teamA;
  }

  onAddPoints(points: number): void {
    this.scoreUpdate.emit({ points });
  }

  onManualScoreChange(score: number): void {
    this.scoreUpdate.emit({ points: score, manual: true });
  }

  onUndoChange(index: number): void {
    this.undoScoreChange.emit(index);
  }

  onUndoLastChange(): void {
    if (this.scoreHistory.length > 0) {
      this.undoScoreChange.emit(0);
    }
  }

  onResetScore(): void {
    this.scoreUpdate.emit({ points: 0, manual: true });
  }

  onSaveScore(): void {
    this.saveScore.emit();
  }

  onRatingSubmitted(event: { type: 'referee' | 'team'; data: any }) {
  console.log('⭐ Calificación recibida:', event);
  // Aquí puedes manejar las calificaciones recibidas
}

  onPlayerStatsUpdate($event: {
    playerId: number;
    teamId: number;
    idCategory: number;
    field: string;
    value: number;
    previousValue: number;
  }) {
    console.log($event);

    if ($event.field == 'ptd') {
      let points: number = 6;

      // para partidos mixtos
      if ($event.idCategory == 3) {
        points = 7;
      }

      this.scoreUpdate.emit({ points });
    }
  }
}
