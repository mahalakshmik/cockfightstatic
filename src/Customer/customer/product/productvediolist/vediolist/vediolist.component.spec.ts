import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VediolistComponent } from './vediolist.component';

describe('VediolistComponent', () => {
  let component: VediolistComponent;
  let fixture: ComponentFixture<VediolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VediolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VediolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
