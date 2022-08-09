import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportbookingListComponent } from './transportbooking-list.component';

describe('TransportbookingListComponent', () => {
  let component: TransportbookingListComponent;
  let fixture: ComponentFixture<TransportbookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportbookingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportbookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
