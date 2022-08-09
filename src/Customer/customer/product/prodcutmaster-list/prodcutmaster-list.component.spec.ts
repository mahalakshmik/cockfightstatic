import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutmasterListComponent } from './prodcutmaster-list.component';

describe('ProdcutmasterListComponent', () => {
  let component: ProdcutmasterListComponent;
  let fixture: ComponentFixture<ProdcutmasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdcutmasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdcutmasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
