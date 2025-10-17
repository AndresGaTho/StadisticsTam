import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matches-header',
  imports: [],
  templateUrl: './matches-header.component.html',
  styleUrl: './matches-header.component.css'
})
export class MatchesHeaderComponent {
  @Input() fieldCount: number = 0;
  @Input() liveFieldsCount: number = 0;
}
