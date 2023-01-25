import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightfallComponent } from './nightfall.component';

describe('NightfallComponent', () => {
  let component: NightfallComponent;
  let fixture: ComponentFixture<NightfallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightfallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
