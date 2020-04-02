import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LectureDetailComponent } from './lecture-detail.component';
import { LectureDetailComponentRoutingModule } from './lecture-detail.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LectureDetailComponentRoutingModule,
  ],
  declarations: [LectureDetailComponent]
})
export class LectureDetailModule { }
