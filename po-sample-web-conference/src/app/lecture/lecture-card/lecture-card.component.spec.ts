import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCardComponent } from './lecture-card.component';

describe('LectureCardComponent', () => {
  let component: LectureCardComponent;
  let fixture: ComponentFixture<LectureCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
