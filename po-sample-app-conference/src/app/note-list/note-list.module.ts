import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NoteListComponent } from './note-list.component';
import { NoteListComponentRoutingModule } from './note-list.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NoteListComponentRoutingModule,
  ],
  declarations: [NoteListComponent]
})
export class NoteListModule { }
