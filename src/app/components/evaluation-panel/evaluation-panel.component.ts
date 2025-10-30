import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluation-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluation-panel.component.html',
  styleUrls: ['./evaluation-panel.component.css']
})
export class EvaluationPanelComponent {
  @Input() comments: string = '';
  @Input() signatureData: string = '';
  @Input() signatureTimestamp: Date | null = null;
  @Input() maxCommentLength: number = 1000;

  @Output() commentsChange = new EventEmitter<string>();
  @Output() openSignature = new EventEmitter<void>();
  @Output() submitEvaluation = new EventEmitter<void>();

  onCommentsChange(): void {
    if (this.comments.length > this.maxCommentLength) {
      this.comments = this.comments.substring(0, this.maxCommentLength);
    }
    this.commentsChange.emit(this.comments);
  }

  getRemainingChars(): number {
    return this.maxCommentLength - this.comments.length;
  }

  onOpenSignature(): void {
    this.openSignature.emit();
  }

  onSubmitEvaluation(): void {
    this.submitEvaluation.emit();
  }
}