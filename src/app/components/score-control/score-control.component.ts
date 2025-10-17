import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScoreChange } from '../../interfaces/ScoreChange';

@Component({
  selector: 'app-score-control',
  imports: [CommonModule],
  templateUrl: './score-control.component.html',
  styleUrl: './score-control.component.css',
})
export class ScoreControlComponent {
  @Input() currentScore: number = 0;
  @Input() scoreHistory: ScoreChange[] = [];
  @Input() hasUnsavedChanges: boolean = false;
  @Input() totalChange: number = 0;
  @Input() lastChange: number = 0;

  @Output() addPoints = new EventEmitter<number>();
  @Output() manualScoreChange = new EventEmitter<number>();
  @Output() undoChange = new EventEmitter<number>();
  @Output() undoLastChange = new EventEmitter<void>();
  @Output() resetScore = new EventEmitter<void>();
  @Output() saveScore = new EventEmitter<void>();

  onManualInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const score = parseInt(value, 10) || 0;
    this.manualScoreChange.emit(score);
  }

  onScoreKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveScore.emit();
    }
  }
  
}
