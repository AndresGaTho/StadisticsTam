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
      },
      {
        id: 2,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 3,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 4,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 5,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 6,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 7,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 8,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 9,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
      {
        id: 10,
        name: 'Andrés',
        fLastName: 'Garcia',
        mLastName: 'Thomas',
        photo:
          'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
      },
    ];
    return of(players);
  }
}
