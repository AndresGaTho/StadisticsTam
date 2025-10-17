import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { CommonModule } from '@angular/common';
import { Player } from '../../interfaces/Player';
import { PlayerStats } from '../../interfaces/PlayerStats';
import { FormsModule } from '@angular/forms';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';

@Component({
  standalone: true,
  selector: 'app-players-list',
  imports: [CommonModule, FormsModule, PhotoModalComponent],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css',
})
export class PlayersListComponent {
  @Input() teamId?: number;
  @Input() editable: boolean = false;
  @Input() category: string = '';
  @Input() idCategory: number = 0;
  @Output() statsUpdate = new EventEmitter<{
    playerId: number;
    teamId: number;
    idCategory: number;
    field: string;
    value: number;
    previousValue: number;
  }>();
  playerStats: { [playerId: number]: PlayerStats } = {};
  players: Player[] = [];
  loading: boolean = false;
  error: string = '';
  selectedPlayer: Player | null = null;
  photoModalVisible = false;

  private saveTimeout: any = null;
  pendingUpdate: {
    playerId: number;
    field: string;
    value: number;
    previousValue: number;
  } | null = null;

  constructor(private playerService: PlayersService) {}

  ngOnInit() {
    this.loadPlayers();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['teamId'] && changes['teamId'].currentValue) {
      this.loadPlayers();
    }
  }
  openPhotoModal(player: Player) {
    this.selectedPlayer = player;
    this.photoModalVisible = true;
    console.log('abriendo foto');
    document.body.style.overflow = 'hidden';
  }
  closePhotoModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    // Esperar a que termine la animación antes de remover el modal
    setTimeout(() => {
      this.selectedPlayer = null;
      this.photoModalVisible = false;
      document.body.style.overflow = '';
    }, 300);
  }
  getInitials(player: Player): string {
    return (player.name.charAt(0) + player.fLastName.charAt(0)).toUpperCase();
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.selectedPlayer) {
      this.closePhotoModal();
    }
  }
  loadPlayers() {
    if (!this.teamId) {
      this.players = [];
      return;
    }
    this.loading = true;
    this.error = '';
    this.playerService.getPlayers(this.teamId).subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los jugadores';
        this.loading = false;
        console.error('Error en la petición:', error);
      },
      complete: () => {},
    });
  }
  getPlayerStats(playerId: number): PlayerStats {
    if (!this.playerStats[playerId]) {
      // Crear estadísticas por defecto si no existen
      this.playerStats[playerId] = {
        playerId: playerId,
        teamId: this.teamId!,
        idCategory: this.idCategory,
        pts: 0,
        ptd: 0,
        int: 0,
        sacks: 0,
        season: '2024',
      };
    }
    return this.playerStats[playerId];
  }

  // Obtener valor de una estadística específica
  getStatValue(playerId: number, field: string): number {
    const stats = this.getPlayerStats(playerId);
    return (stats as any)[field] || 0;
  }

  // Método para incrementar PTD, INT, SACKS en 1
  incrementStat(playerId: number, field: 'ptd' | 'int' | 'sacks') {
    const currentValue = this.getStatValue(playerId, field);
    const newValue = currentValue + 1;
    this.updateStat(playerId, field, newValue, currentValue);
  }
  // Agrega esta propiedad al componente
  playerInputValues: { [playerId: number]: { [field: string]: number } } = {};

  // Método para obtener el valor del input
  getInputValue(playerId: number, field: string): number {
    if (!this.playerInputValues[playerId]) {
      this.playerInputValues[playerId] = {};
    }
    if (this.playerInputValues[playerId][field] === undefined) {
      this.playerInputValues[playerId][field] = this.getStatValue(
        playerId,
        field
      );
    }
    return this.playerInputValues[playerId][field];
  }

  // Método para actualizar el valor del input
  onInputChange(playerId: number, field: string, value: string) {
    const numericValue = parseInt(value) || 0;

    if (!this.playerInputValues[playerId]) {
      this.playerInputValues[playerId] = {};
    }
    this.playerInputValues[playerId][field] = numericValue;

    // Programar el guardado
    const currentValue = this.getStatValue(playerId, field);
    this.updateStat(playerId, field, numericValue, currentValue);
  }
  updateStat(
    playerId: number,
    field: string,
    newValue: number,
    currentValue: number
  ) {
    if (newValue !== currentValue) {
      const stats = this.getPlayerStats(playerId);
      (stats as any)[field] = newValue;
      this.scheduleUpdate(playerId, field, newValue, currentValue);
    }
  }
  // Programar actualización con debounce
  private scheduleUpdate(
    playerId: number,
    field: string,
    value: number,
    previousValue: number
  ) {
    this.pendingUpdate = { playerId, field, value, previousValue };

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      if (this.pendingUpdate) {
        this.emitStatsUpdate();
      }
    }, 2000);
  }

  private emitStatsUpdate() {
    if (this.pendingUpdate && this.teamId && this.idCategory) {
      this.statsUpdate.emit({
        playerId: this.pendingUpdate.playerId,
        teamId: this.teamId,
        idCategory: this.idCategory,
        field: this.pendingUpdate.field,
        value: this.pendingUpdate.value,
        previousValue: this.pendingUpdate.previousValue,
      });
      this.pendingUpdate = null;
    }
  }

  // Forzar guardado inmediato al perder foco
  onFieldBlur() {
    if (this.pendingUpdate && this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.emitStatsUpdate();
    }
  }

  // También forzar guardado al presionar Enter
  onFieldKeydown(event: KeyboardEvent, playerId: number, field: string) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.saveTimeout) {
        clearTimeout(this.saveTimeout);
      }
      // Re-emitir el último cambio pendiente
      if (
        this.pendingUpdate &&
        this.pendingUpdate.playerId === playerId &&
        this.pendingUpdate.field === field
      ) {
        this.emitStatsUpdate();
      }
    }
  }
  // ARREGLADO: Método para obtener el valor actual de PTS
  getPtsValue(playerId: number): number {
    return this.getStatValue(playerId, 'pts');
  }

  // ARREGLADO: Método específico para PTD
  getPtdValue(playerId: number): number {
    return this.getStatValue(playerId, 'ptd');
  }

  // ARREGLADO: Método específico para INT
  getIntValue(playerId: number): number {
    return this.getStatValue(playerId, 'int');
  }

  // ARREGLADO: Método específico para SACKS
  getSacksValue(playerId: number): number {
    return this.getStatValue(playerId, 'sacks');
  }
  // ARREGLADO: Método específico para incrementar PTD
  incrementPtd(playerId: number) {
    const currentValue = this.getPtdValue(playerId);
    const newValue = currentValue + 1;
    this.updateStat(playerId, 'ptd', newValue, currentValue);
  }

  // ARREGLADO: Método específico para incrementar INT
  incrementInt(playerId: number) {
    const currentValue = this.getIntValue(playerId);
    const newValue = currentValue + 1;
    this.updateStat(playerId, 'int', newValue, currentValue);
  }

  // ARREGLADO: Método específico para incrementar SACKS
  incrementSacks(playerId: number) {
    const currentValue = this.getSacksValue(playerId);
    const newValue = currentValue + 1;
    this.updateStat(playerId, 'sacks', newValue, currentValue);
  }

  // ARREGLADO: Método específico para actualizar PTS
  updatePts(playerId: number, value: number | string) {
    const numericValue =
      typeof value === 'string' ? parseInt(value) || 0 : value;
    const currentValue = this.getPtsValue(playerId);
    this.updateStat(playerId, 'pts', Math.max(0, numericValue), currentValue);
  }

  // ARREGLADO: Método específico para agregar puntos rápidos
  quickAddPts(playerId: number, points: number) {
    const currentValue = this.getPtsValue(playerId);
    const newValue = currentValue + points;
    this.updateStat(playerId, 'pts', newValue, currentValue);
  }

  // Métodos públicos para el template
  public hasPendingUpdates(): boolean {
    return this.pendingUpdate !== null;
  }

  public isFieldModified(playerId: number, field: string): boolean {
    return (
      this.pendingUpdate?.playerId === playerId &&
      this.pendingUpdate?.field === field
    );
  }
  ngOnDestroy() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
  }
}
