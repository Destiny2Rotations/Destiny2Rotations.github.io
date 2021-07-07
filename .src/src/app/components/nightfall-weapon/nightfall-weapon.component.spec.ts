import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightfallWeaponComponent } from './nightfall-weapon.component';

describe('NightfallWeaponComponent', () => {
  let component: NightfallWeaponComponent;
  let fixture: ComponentFixture<NightfallWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightfallWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightfallWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
