import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCardDialogComponent } from './show-card-dialog.component';

describe('ShowCardDialogComponent', () => {
  let component: ShowCardDialogComponent;
  let fixture: ComponentFixture<ShowCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
