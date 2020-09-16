import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConferenceComponent } from './conference.component';

const conferenceRoutes: Routes = [
  { path: '', component: ConferenceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(conferenceRoutes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
