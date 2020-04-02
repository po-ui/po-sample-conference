import { Routes, RouterModule } from '@angular/router';
import { SpeakerListComponent } from './speaker-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SpeakerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerListComponentRoutingModule { }
