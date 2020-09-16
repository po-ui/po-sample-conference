import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureDetailComponent } from './lecture-detail.component';

describe('LectureDetailComponent', () => {
  let component: LectureDetailComponent;
  let fixture: ComponentFixture<LectureDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
