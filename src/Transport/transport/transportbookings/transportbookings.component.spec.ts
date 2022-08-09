import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportbookingsComponent } from './transportbookings.component';

describe('TransportbookingsComponent', () => {
  let component: TransportbookingsComponent;
  let fixture: ComponentFixture<TransportbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportbookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
