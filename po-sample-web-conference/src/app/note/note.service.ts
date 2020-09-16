import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GenericService } from './../generic/service/generic.service';
import { Note } from '../model/note';

@Injectable()
export class NoteService extends GenericService<Note> {

  path = 'notes';

  constructor(http: HttpClient) {
    super(http);
  }

}
