import { NgModule } from '@angular/core';

import { CardCountModule } from './../generic/card-count/card-count.module';
import { HomeComponent } from './home.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { LectureService } from './../lecture/lecture.service';
import { SharedModule } from './../shared/shared.module';
import { SpeakerModule } from '../speaker/speaker.module';
import { NoteService } from '../note/note.service';
import { SpeakerService } from '../speaker/speaker.service';
import { TrackService } from '../track/track.service';

@NgModule({
  imports: [
    SharedModule,
    CardCountModule,
    SpeakerModule,

    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
  ],
  providers: [
    LectureService,
    NoteService,
    SpeakerService,
    TrackService
  ]
})
export class HomeModule { }
