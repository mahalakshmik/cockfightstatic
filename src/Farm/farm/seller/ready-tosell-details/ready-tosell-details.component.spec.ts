import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyTosellDetailsComponent } from './ready-tosell-details.component';

describe('ReadyTosellDetailsComponent', () => {
  let component: ReadyTosellDetailsComponent;
  let fixture: ComponentFixture<ReadyTosellDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyTosellDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyTosellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
