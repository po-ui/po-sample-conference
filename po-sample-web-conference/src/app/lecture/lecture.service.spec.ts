import { TestBed, inject } from '@angular/core/testing';

import { LectureService } from './lecture.service';

describe('LectureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureService]
    });
  });

  it('should be created', inject([LectureService], (service: LectureService) => {
    expect(service).toBeTruthy();
  }));
});
