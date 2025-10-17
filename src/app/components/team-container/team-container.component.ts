import { Component } from '@angular/core';
import { PlayersListComponent } from "../players-list/players-list.component";
import { TeamInfoComponent } from "../team-info/team-info.component";

@Component({
  selector: 'app-team-container',
  imports: [PlayersListComponent, TeamInfoComponent],
  templateUrl: './team-container.component.html',
  styleUrl: './team-container.component.css'
})
export class TeamContainerComponent {

}
