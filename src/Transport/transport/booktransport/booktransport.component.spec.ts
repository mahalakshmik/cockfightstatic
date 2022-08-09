import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktransportComponent } from './booktransport.component';

describe('BooktransportComponent', () => {
  let component: BooktransportComponent;
  let fixture: ComponentFixture<BooktransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooktransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooktransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
