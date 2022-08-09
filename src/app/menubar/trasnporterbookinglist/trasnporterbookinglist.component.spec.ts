import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnporterbookinglistComponent } from './trasnporterbookinglist.component';

describe('TrasnporterbookinglistComponent', () => {
  let component: TrasnporterbookinglistComponent;
  let fixture: ComponentFixture<TrasnporterbookinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasnporterbookinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasnporterbookinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
