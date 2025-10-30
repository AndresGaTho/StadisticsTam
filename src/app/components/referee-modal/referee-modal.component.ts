import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ref } from '../../interfaces/Ref';

@Component({
  selector: 'app-referee-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './referee-modal.component.html',
  styleUrls: ['./referee-modal.component.css']
})
export class RefereeModalComponent {
  @Input() referee: Ref | null = null;
  @Input() showModal: boolean = false;
  @Input() rating: number = 0;
  @Input() comments: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() commentsChange = new EventEmitter<string>();
  @Output() submitRating = new EventEmitter<void>();

  hoverRating: number = 0;
  
  maxLength:number = 500;

  onClose(): void {
    this.close.emit();
  }

  onRate(rating: number): void {
    this.ratingChange.emit(rating);
  }

  onCommentsChange(): void {
    this.commentsChange.emit(this.comments);
  }

  onSubmit(): void {
    this.submitRating.emit();
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }

  isStarActive(star: number, currentRating: number): boolean {
    return star <= currentRating;
  }

  getInitials(): string {
    if (!this.referee) return '';
    return (this.referee.name.charAt(0) + this.referee.fLastName.charAt(0)).toUpperCase();
  }

  handleImageError(event: any): void {
    event.target.style.display = 'none';
  }
}