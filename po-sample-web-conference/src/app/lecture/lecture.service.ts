import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GenericService } from '../generic/service/generic.service';
import { Lecture } from './../model/lecture';

@Injectable()
export class LectureService extends GenericService<Lecture> {

  path = 'lectures';

  constructor(http: HttpClient) {
    super(http);
  }

}
