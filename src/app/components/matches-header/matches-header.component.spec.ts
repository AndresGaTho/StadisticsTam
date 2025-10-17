import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesHeaderComponent } from './matches-header.component';

describe('MatchesHeaderComponent', () => {
  let component: MatchesHeaderComponent;
  let fixture: ComponentFixture<MatchesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
