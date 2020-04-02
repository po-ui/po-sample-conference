import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerDetailComponentRoutingModule } from './speaker-detail.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpeakerDetailComponentRoutingModule,
  ],
  declarations: [SpeakerDetailComponent]
})
export class SpeakerDetailModule { }
