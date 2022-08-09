import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmorderPaymentComponent } from './confirmorder-payment.component';

describe('ConfirmorderPaymentComponent', () => {
  let component: ConfirmorderPaymentComponent;
  let fixture: ComponentFixture<ConfirmorderPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmorderPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmorderPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
