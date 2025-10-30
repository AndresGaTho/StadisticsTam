import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereesComentComponent } from './referees-coment.component';

describe('RefereesComentComponent', () => {
  let component: RefereesComentComponent;
  let fixture: ComponentFixture<RefereesComentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefereesComentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefereesComentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
