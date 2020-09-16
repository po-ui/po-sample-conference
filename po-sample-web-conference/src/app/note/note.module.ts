import { NgModule } from '@angular/core';

import { NoteService } from './note.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [
    NoteService
  ]
})
export class NoteModule { }
