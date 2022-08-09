import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreeddetailsComponent } from './breeddetails.component';

describe('BreeddetailsComponent', () => {
  let component: BreeddetailsComponent;
  let fixture: ComponentFixture<BreeddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreeddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreeddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
