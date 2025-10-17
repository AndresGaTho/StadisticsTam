import { Component } from '@angular/core';
import { Team } from '../../interfaces/Team';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-info',
  imports: [CommonModule],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css',
})
export class TeamInfoComponent {
  team: Team = {
    id: 1,
    coach: 'Cintla xd',
    founded: 'dd/mm/yyyy',
    logo: 'https://juegatocho.com/Equipos/2520_fg.jpeg',
    name: 'Pitbulls',
    owner: 'Cintla x2',
    wins: 0,
    losses: 0,
  };

  getWinRate() {
    return 0;
  }
}
