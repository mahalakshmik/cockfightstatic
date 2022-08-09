import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldoutlistComponent } from './soldoutlist.component';

describe('SoldoutlistComponent', () => {
  let component: SoldoutlistComponent;
  let fixture: ComponentFixture<SoldoutlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldoutlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldoutlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
