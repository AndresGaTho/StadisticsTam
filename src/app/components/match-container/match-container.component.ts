import { Component } from '@angular/core';
import { Team } from '../../interfaces/Team';
import { Match } from '../../interfaces/Match';
import { CommonModule } from '@angular/common';
import { MatchTeam } from '../../interfaces/MatchTeam';
import { PlayersListComponent } from '../players-list/players-list.component';
import { TeamService } from '../../services/team.service';
import { MatchesHeaderComponent } from '../matches-header/matches-header.component';
import { FieldGroupComponent } from '../field-group/field-group.component';
import { MatchCardComponent } from '../match-card/match-card.component';
import { TeamModalComponent } from '../team-modal/team-modal.component';
import { ScoreChange } from '../../interfaces/ScoreChange';

@Component({
  standalone: true,
  selector: 'app-match-container',
  imports: [
    CommonModule,
    MatchesHeaderComponent,
    FieldGroupComponent,
    MatchCardComponent,
    TeamModalComponent,
  ],
  templateUrl: './match-container.component.html',
  styleUrl: './match-container.component.css',
})
export class MatchContainerComponent {
  matches: Match[] = [];
  loading: boolean = false;
  error: string = '';
  groupedMatches: { [key: string]: Match[] } = {};
  expandedFields: { [key: string]: boolean } = {};
  fieldsWithLiveMatches: string[] = [];
  showTeamModal: boolean = false;
  selectedTeam: MatchTeam | null = null;
  selectedMatch: Match | null = null;
  isTeamA: boolean = false;
  newScore: number = 0;
  lastChange: number = 0;
  scoreHistory: { amount: number; timestamp: Date }[] = [];
  originalScore: number = 0;
  totalChange: number = 0;
  hasUnsavedChanges: boolean = false;

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.loadMatches();
  }

  loadMatches() {
    this.teamService.getAllGames().subscribe({
      next: (data) => {
        this.matches = data;
        this.groupMatchesByField();
        this.detectLiveMatches();
        this.autoExpandLiveMatches();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los partidos';
        this.loading = false;
        console.error('Error en la petición:', error);
      }
    });
  }

  groupMatchesByField() {
    this.groupedMatches = {};
    this.matches.forEach((match) => {
      if (!this.groupedMatches[match.field]) {
        this.groupedMatches[match.field] = [];
      }
      this.groupedMatches[match.field].push(match);
    });
  }

  autoExpandLiveMatches() {
    this.fieldsWithLiveMatches.forEach((field) => {
      this.expandedFields[field] = true;
    });
  }

  scrollToField(field: string) {
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  anyFieldExpanded(): boolean {
    return Object.values(this.expandedFields).some((expanded) => expanded);
  }

  collapseAllFields() {
    Object.keys(this.expandedFields).forEach((field) => {
      this.expandedFields[field] = false;
    });
  }

  detectLiveMatches() {
    this.fieldsWithLiveMatches = Object.keys(this.groupedMatches).filter(
      (field) =>
        this.groupedMatches[field].some((match) => match.status === 'live')
    );
  }

  toggleField(field: string) {
    this.expandedFields[field] = !this.expandedFields[field];
  }

  isFieldExpanded(field: string): boolean {
    return this.expandedFields[field] || false;
  }

  getFieldMatchCount(field: string): number {
    return this.groupedMatches[field]?.length || 0;
  }

  getFieldLiveCount(field: string): number {
    return (
      this.groupedMatches[field]?.filter((match) => match.status === 'live')
        .length || 0
    );
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'live':
        return 'status-live';
      case 'finished':
        return 'status-finished';
      default:
        return 'status-scheduled';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'live':
        return 'En Vivo';
      case 'finished':
        return 'Finalizado';
      default:
        return 'Programado';
    }
  }

  getWinRate(team: MatchTeam): number {
    const totalGames = team.wins + team.losses;
    return totalGames > 0 ? Math.round((team.wins / totalGames) * 100) : 0;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  // MÉTODOS PARA EL MODAL - AHORA IMPLEMENTADOS
  openTeamModal(match: Match, team: MatchTeam, isTeamA: boolean) {
    this.selectedTeam = team;
    this.selectedMatch = match;
    this.isTeamA = isTeamA;
    this.newScore = this.getCurrentScore();
    this.originalScore = this.newScore;
    this.scoreHistory = [];
    this.lastChange = 0;
    this.totalChange = 0;
    this.hasUnsavedChanges = false;
    this.showTeamModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeTeamModal() {
    this.showTeamModal = false;
    this.selectedTeam = null;
    this.selectedMatch = null;
    document.body.style.overflow = '';
  }

  getCurrentScore(): number {
    if (!this.selectedMatch || !this.selectedTeam) return 0;
    return this.isTeamA
      ? this.selectedMatch.scoreA || 0
      : this.selectedMatch.scoreB || 0;
  }

  getOpponentTeam(): MatchTeam | null {
    if (!this.selectedMatch || !this.selectedTeam) return null;
    return this.isTeamA ? this.selectedMatch.teamB : this.selectedMatch.teamA;
  }

  // MÉTODOS PARA ACTUALIZAR SCORE - AHORA IMPLEMENTADOS
  onScoreUpdate(event: { points: number; manual?: boolean }) {
    const oldScore = this.newScore;
    
    if (event.manual) {
      // Entrada manual - establecer valor absoluto
      this.newScore = Math.max(0, event.points);
    } else {
      // Botones de puntos - sumar al valor actual
      this.newScore = Math.max(0, this.newScore + event.points);
    }

    const changeAmount = this.newScore - oldScore;
    
    if (changeAmount !== 0) {
      this.lastChange = changeAmount;
      this.scoreHistory.unshift({
        amount: changeAmount,
        timestamp: new Date()
      });
      
      this.totalChange = this.newScore - this.originalScore;
      this.hasUnsavedChanges = this.totalChange !== 0;
    }
  }

  onUndoScoreChange(index: number) {
    if (this.scoreHistory.length > 0 && index >= 0 && index < this.scoreHistory.length) {
      const change = this.scoreHistory[index];
      
      // Revertir este cambio específico
      this.newScore = Math.max(0, this.newScore - change.amount);
      
      // Eliminar del historial
      this.scoreHistory.splice(index, 1);
      
      // Recalcular cambios
      this.totalChange = this.newScore - this.originalScore;
      this.hasUnsavedChanges = this.totalChange !== 0;
      this.lastChange = 0;
    }
  }

  updateScore() {
    if (this.selectedMatch && this.selectedTeam) {
      // Actualizar el score en el partido
      if (this.isTeamA) {
        this.selectedMatch.scoreA = this.newScore;
      } else {
        this.selectedMatch.scoreB = this.newScore;
      }

      // Aquí podrías enviar el update a tu API
      console.log('Score actualizado:', {
        team: this.selectedTeam.name,
        newScore: this.newScore,
        changes: this.scoreHistory,
        totalChange: this.totalChange,
      });

      // Resetear estado
      this.hasUnsavedChanges = false;
      this.scoreHistory = [];
      this.totalChange = 0;
      this.lastChange = 0;

      this.closeTeamModal();
    }
  }

  // Método auxiliar para deshacer el último cambio
  undoLastChange() {
    if (this.scoreHistory.length > 0) {
      this.onUndoScoreChange(0);
    }
  }

  // Método auxiliar para resetear el score
  resetScore() {
    this.newScore = 0;
    this.scoreHistory = [];
    this.totalChange = -this.originalScore;
    this.lastChange = -this.originalScore;
    this.hasUnsavedChanges = this.originalScore !== 0;
  }

  // Método para las estadísticas (puedes implementarlo más tarde)
  onStatsClick(match: Match) {
    console.log('Abrir estadísticas del partido:', match);
    // Aquí puedes implementar la lógica para mostrar estadísticas
  }
}