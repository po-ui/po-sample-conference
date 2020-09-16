import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackComponent } from './track.component';

const trackRoutes: Routes = [
  { path: '', component: TrackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(trackRoutes)],
  exports: [RouterModule]
})
export class TrackRoutingModule { }
