import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressdeliveryComponent } from './addressdelivery.component';

describe('AddressdeliveryComponent', () => {
  let component: AddressdeliveryComponent;
  let fixture: ComponentFixture<AddressdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
