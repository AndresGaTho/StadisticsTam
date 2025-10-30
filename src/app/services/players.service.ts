import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../interfaces/Player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayers(idTeam: number): Observable<Player[]> {
    const players: Player[] = [
      {
        id: 1,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo: '',
        gender: 'male',
      },
      {
        id: 2,
        name: 'Andrea',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'female',
      },
      {
        id: 3,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 4,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 5,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'female',
      },
      {
        id: 6,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 7,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 8,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 9,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
      {
        id: 10,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
        gender: 'male',
      },
    ];
    return of(players);
  }
}
