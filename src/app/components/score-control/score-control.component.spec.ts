import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreControlComponent } from './score-control.component';

describe('ScoreControlComponent', () => {
  let component: ScoreControlComponent;
  let fixture: ComponentFixture<ScoreControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
