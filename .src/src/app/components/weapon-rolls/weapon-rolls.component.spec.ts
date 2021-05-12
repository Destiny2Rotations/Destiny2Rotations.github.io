import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponRollsComponent } from './weapon-rolls.component';

describe('WeaponRollsComponent', () => {
  let component: WeaponRollsComponent;
  let fixture: ComponentFixture<WeaponRollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponRollsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponRollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
