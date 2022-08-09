import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyTosellListComponent } from './ready-tosell-list.component';

describe('ReadyTosellListComponent', () => {
  let component: ReadyTosellListComponent;
  let fixture: ComponentFixture<ReadyTosellListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyTosellListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyTosellListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
