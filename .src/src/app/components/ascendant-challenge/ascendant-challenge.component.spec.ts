import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscendantChallengeComponent } from './ascendant-challenge.component';

describe('AscendantChallengeComponent', () => {
  let component: AscendantChallengeComponent;
  let fixture: ComponentFixture<AscendantChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscendantChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscendantChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
