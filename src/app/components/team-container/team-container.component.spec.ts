import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamContainerComponent } from './team-container.component';

describe('TeamContainerComponent', () => {
  let component: TeamContainerComponent;
  let fixture: ComponentFixture<TeamContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
