import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchContainerComponent } from './match-container.component';

describe('MatchContainerComponent', () => {
  let component: MatchContainerComponent;
  let fixture: ComponentFixture<MatchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
