import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { TrackComponent } from './track.component';
import { TrackRoutingModule } from './track-routing.module';
import { TrackService } from './track.service';

@NgModule({
  imports: [
    SharedModule,

    TrackRoutingModule
  ],
  declarations: [
    TrackComponent
  ],
  providers: [
    TrackService
  ]
})
export class TrackModule { }
