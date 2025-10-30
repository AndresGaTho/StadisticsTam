import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeModalComponent } from './referee-modal.component';

describe('RefereeModalComponent', () => {
  let component: RefereeModalComponent;
  let fixture: ComponentFixture<RefereeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefereeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
