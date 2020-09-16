import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GenericService } from '../generic/service/generic.service';
import { Speaker } from './../model/speaker';

@Injectable()
export class SpeakerService extends GenericService<Speaker> {

  path = 'speakers';

  constructor(http: HttpClient) {
    super(http);
  }

}
