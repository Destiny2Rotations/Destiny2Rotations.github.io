import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurseStrengthComponent } from './curse-strength.component';

describe('CurseStrengthComponent', () => {
  let component: CurseStrengthComponent;
  let fixture: ComponentFixture<CurseStrengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurseStrengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurseStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
