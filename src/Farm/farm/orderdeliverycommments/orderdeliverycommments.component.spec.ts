import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdeliverycommmentsComponent } from './orderdeliverycommments.component';

describe('OrderdeliverycommmentsComponent', () => {
  let component: OrderdeliverycommmentsComponent;
  let fixture: ComponentFixture<OrderdeliverycommmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdeliverycommmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdeliverycommmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
