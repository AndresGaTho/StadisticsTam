import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ref } from '../../interfaces/Ref';

@Component({
  selector: 'app-team-rating-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-rating-modal.component.html',
  styleUrls: ['./team-rating-modal.component.css']
})
export class TeamRatingModalComponent {
  @Input() showModal: boolean = false;
  @Input() referees: Ref[] = [];
  
  @Output() close = new EventEmitter<void>();
  @Output() submitRating = new EventEmitter<void>();

  teamRatingCategories = [
    { id: 'overall', icon: '⭐', name: 'General', description: 'Desempeño general del equipo', rating: 0 },
    { id: 'fairness', icon: '⚖️', name: 'Imparcialidad', description: 'Equidad en las decisiones', rating: 0 },
    { id: 'professionalism', icon: '👔', name: 'Profesionalismo', description: 'Conducta y presentación', rating: 0 },
    { id: 'consistency', icon: '🔄', name: 'Consistencia', description: 'Uniformidad en criterios', rating: 0 }
  ];

  teamComments: string = '';
  maxCommentLength: number = 1000;

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    this.submitRating.emit();
  }

  setCategoryRating(categoryId: string, rating: number): void {
    const category = this.teamRatingCategories.find(c => c.id === categoryId);
    if (category) {
      category.rating = rating;
    }
  }

  getCategoryRating(categoryId: string): number {
    const category = this.teamRatingCategories.find(c => c.id === categoryId);
    return category ? category.rating : 0;
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i + 1);
  }

  isStarActive(star: number, currentRating: number): boolean {
    return star <= currentRating;
  }

  getAverageRating(): number {
    const ratings = this.referees.map(r => r.rating || 0).filter(r => r > 0);
    return ratings.length ? 
      Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : 0;
  }

  getTotalExperience(): number {
    return this.referees.reduce((total, r) => total + (r.experience || 0), 0);
  }

  getRemainingTeamChars(): number {
    return this.maxCommentLength - this.teamComments.length;
  }

  isTeamRatingComplete(): boolean {
    return this.teamRatingCategories.every(c => c.rating > 0) && 
           this.teamComments.length > 0;
  }
}