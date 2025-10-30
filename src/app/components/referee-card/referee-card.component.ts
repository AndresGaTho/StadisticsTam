import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ref } from '../../interfaces/Ref';

@Component({
  selector: 'app-referee-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referee-card.component.html',
  styleUrls: ['./referee-card.component.css']
})
export class RefereeCardComponent {
  @Input() referee!: Ref;
  @Output() cardClick = new EventEmitter<Ref>();
  @Output() rateClick = new EventEmitter<Ref>();

  onCardClick(): void {
    this.cardClick.emit(this.referee);
  }

  onRateClick(event: Event): void {
    event.stopPropagation();
    this.rateClick.emit(this.referee);
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }

  getInitials(): string {
    return (this.referee.name.charAt(0) + this.referee.fLastName.charAt(0)).toUpperCase();
  }
}