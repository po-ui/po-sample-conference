import { NgModule } from '@angular/core';

import { LectureModule } from './../lecture/lecture.module';
import { SharedModule } from './../shared/shared.module';
import { SpeakerCardComponent } from './speaker-card/speaker-card.component';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail/speaker-detail.component';
import { SpeakerEditComponent } from './speaker-edit/speaker-edit.component';
import { SpeakerRoutingModule } from './speaker-routing.module';
import { SpeakerService } from './speaker.service';

@NgModule({
  imports: [
    SharedModule,
    LectureModule,

    SpeakerRoutingModule
  ],
  declarations: [
    SpeakerCardComponent,
    SpeakerComponent,
    SpeakerDetailComponent,
    SpeakerEditComponent
  ],
  providers: [
    SpeakerService
  ]
})
export class SpeakerModule { }
