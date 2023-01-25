import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterSorrowsComponent } from './alter-sorrows.component';

describe('AlterSorrowsComponent', () => {
  let component: AlterSorrowsComponent;
  let fixture: ComponentFixture<AlterSorrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterSorrowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterSorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
