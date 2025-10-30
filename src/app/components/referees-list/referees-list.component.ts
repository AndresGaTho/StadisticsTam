import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefereeService } from '../../services/referee.service';
import { Ref } from '../../interfaces/Ref';
import { RefereeRating } from '../../interfaces/RefereeRating';
import { TeamRating } from '../../interfaces/TeamRating';
import { RefereeCardComponent } from '../referee-card/referee-card.component';
import { EvaluationPanelComponent } from '../evaluation-panel/evaluation-panel.component';
import { RefereeModalComponent } from '../referee-modal/referee-modal.component';
import { TeamRatingModalComponent } from '../team-rating-modal/team-rating-modal.component';
import { SignatureModalComponent } from '../signature-modal/signature-modal.component';

@Component({
  selector: 'app-referees-list',
  standalone: true,
  imports: [
    CommonModule, 
    RefereeCardComponent,
    EvaluationPanelComponent,
    RefereeModalComponent,
    TeamRatingModalComponent,
    SignatureModalComponent
  ],
  templateUrl: './referees-list.component.html',
  styleUrls: ['./referees-list.component.css']
})
export class RefereesListComponent {
  @Input() teamId?: number;
  @Input() matchId?: number;
  @Input() maxCommentLength: number = 1000;

  @Output() ratingSubmitted = new EventEmitter<{
    type: 'referee' | 'team';
    data: any;
  }>();

  referees: Ref[] = [];
  selectedReferee: Ref | null = null;
  showRefereeModal: boolean = false;
  showTeamRatingModal: boolean = false;
  showSignatureModal: boolean = false;

  // Estados para calificaciones
  refereeRating: number = 0;
  refereeComments: string = '';
  teamComments: string = '';
  signatureData: string = '';
  signatureTimestamp: Date | null = null;

  constructor(private refereeService: RefereeService) {}

  ngOnInit() {
    this.loadReferees();
  }

  loadReferees() {
    this.refereeService.referees$.subscribe((referees) => {
      this.referees = referees;
    });
  }

  // Modal de árbitro individual
  openRefereeModal(referee: Ref) {
    this.selectedReferee = referee;
    this.showRefereeModal = true;

    // Cargar rating existente si existe
    const existingRatings = this.refereeService.getRefereeRatings(referee.id);
    if (existingRatings.length > 0) {
      this.refereeRating = existingRatings[0].rating;
      this.refereeComments = existingRatings[0].comments || '';
    } else {
      this.refereeRating = 0;
      this.refereeComments = '';
    }

    document.body.style.overflow = 'hidden';
  }

  closeRefereeModal() {
    this.showRefereeModal = false;
    this.selectedReferee = null;
    this.refereeRating = 0;
    this.refereeComments = '';
    document.body.style.overflow = '';
  }

  // Modal de calificación de equipo
  openTeamRatingModal() {
    this.showTeamRatingModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeTeamRatingModal() {
    this.showTeamRatingModal = false;
    document.body.style.overflow = '';
  }

  // Modal de firma
   @ViewChild(SignatureModalComponent) signatureModal!: SignatureModalComponent;
   openSignatureModal() {
    this.signatureModal.open();
  }

  onSignatureSaved(signatureData: string) {
    this.signatureData = signatureData;
    console.log('Firma guardada:', signatureData);
    // Aquí puedes enviar la firma a tu backend o almacenarla
  }

  onModalClosed() {
    console.log('Modal de firma cerrado');
  }

  closeSignatureModal() {
    this.showSignatureModal = false;
    document.body.style.overflow = '';
  }

  // Calificar árbitro
  rateReferee(rating: number) {
    this.refereeRating = rating;
  }

  submitRefereeRating() {
    if (this.selectedReferee) {
      const rating: RefereeRating = {
        refereeId: this.selectedReferee.id,
        rating: this.refereeRating,
        comments: this.refereeComments.substring(0, 200),
        timestamp: new Date(),
        raterId: this.teamId,
      };

      this.refereeService.rateReferee(rating);
      this.ratingSubmitted.emit({
        type: 'referee',
        data: rating,
      });

      this.closeRefereeModal();
    }
  }

  // Calificar equipo completo
  submitTeamRating() {
    if (this.teamId && this.matchId) {
      const rating: TeamRating = {
        teamId: this.teamId,
        matchId: this.matchId,
        overallRating: 0, // Estos valores vendrían del modal de equipo
        fairness: 0,
        professionalism: 0,
        comments: this.teamComments,
        signature: this.signatureData,
        timestamp: new Date(),
      };

      this.refereeService.rateTeam(rating);
      this.ratingSubmitted.emit({
        type: 'team',
        data: rating,
      });

      this.closeTeamRatingModal();
    }
  }

  // Manejar firma
  onSignatureComplete(signatureData: string) {
    this.signatureData = signatureData;
    this.signatureTimestamp = new Date();
    this.closeSignatureModal();
  }

  // Utilidades
  getRemainingChars(): number {
    return this.maxCommentLength - this.comments.length;
  }

  getAverageRating(): number {
    const ratings = this.referees.map(r => r.rating || 0).filter(r => r > 0);
    return ratings.length ? 
      Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10 : 0;
  }

  getTotalExperience(): number {
    return this.referees.reduce((total, r) => total + (r.experience || 0), 0);
  }

  onCommentsChange(comments: string) {
    this.comments = comments;
  }

  submitCompleteEvaluation() {
    this.submitTeamRating();
  }

  get comments(): string {
    return this.teamComments;
  }

  set comments(value: string) {
    this.teamComments = value;
  }
  
}