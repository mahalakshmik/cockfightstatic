import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyTosellInfoComponent } from './ready-tosell-info.component';

describe('ReadyTosellInfoComponent', () => {
  let component: ReadyTosellInfoComponent;
  let fixture: ComponentFixture<ReadyTosellInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyTosellInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyTosellInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
