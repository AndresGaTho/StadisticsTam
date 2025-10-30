import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereesListComponent } from './referees-list.component';

describe('RefereesListComponent', () => {
  let component: RefereesListComponent;
  let fixture: ComponentFixture<RefereesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefereesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
