import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Conference } from './../model/conference';
import { GenericService } from '../generic/service/generic.service';

@Injectable()
export class ConferenceService extends GenericService<Conference> {

  path = 'conferences';

  constructor(http: HttpClient) {
    super(http);
  }
}
