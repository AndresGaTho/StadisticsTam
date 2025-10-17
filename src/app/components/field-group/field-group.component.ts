import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-field-group',
  imports: [CommonModule],
  templateUrl: './field-group.component.html',
  styleUrl: './field-group.component.css',
})
export class FieldGroupComponent {
  @Input() fieldName!: string;
  @Input() matchCount!: number;
  @Input() liveCount!: number;
  @Input() expanded: boolean = false;
  @Output() toggleExpanded = new EventEmitter<void>();
}
