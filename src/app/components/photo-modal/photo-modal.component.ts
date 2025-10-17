import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../interfaces/Player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-modal',
  imports: [CommonModule],
  templateUrl: './photo-modal.component.html',
  styleUrl: './photo-modal.component.css',
})
export class PhotoModalComponent {
  @Input() player: Player | null = null;
  @Input() visible: boolean = false;
  @Input() isClosing: boolean = false;
  @Output() close = new EventEmitter<void>();
  closeModal(event: Event) {
    event.stopPropagation();
    this.close.emit();
  }

  getInitials(player: Player): string {
    const firstInitial = player.name?.charAt(0) || '';
    const lastInitial = player.fLastName?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  }

  onBackdropClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains('photo-modal')) {
      this.close.emit();
    }
  }
}
