// services/referee.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ref } from '../interfaces/Ref';
import { RefereeRating } from '../interfaces/RefereeRating';
import { TeamRating } from '../interfaces/TeamRating';


@Injectable({
  providedIn: 'root',
})
export class RefereeService {
  private referees = new BehaviorSubject<Ref[]>([]);
  private ratings = new BehaviorSubject<RefereeRating[]>([]);
  private teamRatings = new BehaviorSubject<TeamRating[]>([]);

  public referees$ = this.referees.asObservable();
  public ratings$ = this.ratings.asObservable();
  public teamRatings$ = this.teamRatings.asObservable();

  constructor() {
    this.loadSampleReferees();
  }

  private loadSampleReferees() {
    const sampleReferees: Ref[] = [
      {
        id: 1,
        name: 'Carlos',
        fLastName: 'Rodríguez',
        mLastName: '',
        photo: '/imgs/ref.png',
        position: 'Árbitro Principal',
        experience: 8,
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Ana',
        fLastName: 'Martínez',
        mLastName: '',
        photo: '/imgs/ref2.png',
        position: 'Juez de Línea',
        experience: 5,
        rating: 4.2,
      },
      {
        id: 3,
        name: 'Miguel',
        fLastName: 'González',
        mLastName: '',
        photo: 'imgs/ref.png',
        position: 'Juez de Campo',
        experience: 6,
        rating: 4.7,
      },
      {
        id: 4,
        name: 'Laura',
        fLastName: 'Hernández',
        mLastName: '',
        photo: 'imgs/ref2.png',
        position: 'Árbitro de Repuesto',
        experience: 3,
        rating: 4.0,
      },
    ];

    this.referees.next(sampleReferees);
  }

  // Calificar árbitro individual
  rateReferee(rating: RefereeRating) {
    const currentRatings = this.ratings.value;
    // Actualizar rating existente o agregar nuevo
    const existingIndex = currentRatings.findIndex(
      (r) => r.refereeId === rating.refereeId && r.raterId === rating.raterId
    );

    if (existingIndex >= 0) {
      currentRatings[existingIndex] = rating;
    } else {
      currentRatings.push(rating);
    }

    this.ratings.next([...currentRatings]);
    this.updateRefereeAverageRating(rating.refereeId);
  }

  // Calificar plantilla completa
  rateTeam(rating: TeamRating) {
    const currentTeamRatings = this.teamRatings.value;
    const existingIndex = currentTeamRatings.findIndex(
      (r) => r.teamId === rating.teamId && r.matchId === rating.matchId
    );

    if (existingIndex >= 0) {
      currentTeamRatings[existingIndex] = rating;
    } else {
      currentTeamRatings.push(rating);
    }

    this.teamRatings.next([...currentTeamRatings]);
  }

  private updateRefereeAverageRating(refereeId: number) {
    const refereeRatings = this.ratings.value.filter(
      (r) => r.refereeId === refereeId
    );
    if (refereeRatings.length > 0) {
      const average =
        refereeRatings.reduce((sum, r) => sum + r.rating, 0) /
        refereeRatings.length;

      const currentReferees = this.referees.value;
      const refereeIndex = currentReferees.findIndex((r) => r.id === refereeId);

      if (refereeIndex >= 0) {
        currentReferees[refereeIndex].rating = Math.round(average * 10) / 10;
        this.referees.next([...currentReferees]);
      }
    }
  }

  getRefereeRatings(refereeId: number): RefereeRating[] {
    return this.ratings.value.filter((r) => r.refereeId === refereeId);
  }

  getTeamRating(teamId: number, matchId: number): TeamRating | undefined {
    return this.teamRatings.value.find(
      (r) => r.teamId === teamId && r.matchId === matchId
    );
  }
}
