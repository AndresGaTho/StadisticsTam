import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRatingModalComponent } from './team-rating-modal.component';

describe('TeamRatingModalComponent', () => {
  let component: TeamRatingModalComponent;
  let fixture: ComponentFixture<TeamRatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRatingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
