import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedlistComponent } from './followedlist.component';

describe('FollowedlistComponent', () => {
  let component: FollowedlistComponent;
  let fixture: ComponentFixture<FollowedlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowedlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
