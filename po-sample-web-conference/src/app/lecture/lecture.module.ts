import { NgModule } from '@angular/core';

import { LectureCardComponent } from './lecture-card/lecture-card.component';
import { LectureComponent } from './lecture.component';
import { LectureDetailComponent } from './lecture-detail/lecture-detail.component';
import { LectureEditComponent } from './lecture-edit/lecture-edit.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { LectureService } from './lecture.service';
import { SharedModule } from './../shared/shared.module';
import { SpeakerService } from './../speaker/speaker.service';

@NgModule({
  imports: [
    SharedModule,
    LectureRoutingModule
  ],
  declarations: [
    LectureCardComponent,
    LectureComponent,
    LectureDetailComponent,
    LectureEditComponent
  ],
  exports: [
    LectureCardComponent
  ],
  providers: [
    LectureService,
    SpeakerService
  ]
})
export class LectureModule { }
