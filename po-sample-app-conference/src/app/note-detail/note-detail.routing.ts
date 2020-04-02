import { Routes, RouterModule } from '@angular/router';
import { NoteDetailComponent } from './note-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: NoteDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteDetailComponentRoutingModule { }
