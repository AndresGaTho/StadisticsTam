import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPanelComponent } from './evaluation-panel.component';

describe('EvaluationPanelComponent', () => {
  let component: EvaluationPanelComponent;
  let fixture: ComponentFixture<EvaluationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
