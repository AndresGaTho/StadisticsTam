import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Match } from '../../interfaces/Match';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-card',
  imports: [CommonModule],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.css',
})
export class MatchCardComponent {
  @Input() match!: Match;
  @Output() teamClicked = new EventEmitter<{
    match: Match;
    team: any;
    isTeamA: boolean;
  }>();
  @Output() statsClicked = new EventEmitter<Match>();

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      scheduled: 'status-scheduled',
      live: 'status-live',
      finished: 'status-finished',
    };
    return statusClasses[status] || 'status-scheduled';
  }

  getStatusText(status: string): string {
    const statusTexts: { [key: string]: string } = {
      scheduled: 'Programado',
      live: 'En Vivo',
      finished: 'Finalizado',
    };
    return statusTexts[status] || 'Programado';
  }
  
}
