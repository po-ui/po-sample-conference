import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpeakerDetailComponent } from './speaker-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SpeakerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerDetailComponentRoutingModule { }
