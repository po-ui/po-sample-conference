import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SpeakerListComponentRoutingModule } from './speaker-list.routing';
import { SpeakerListComponent } from './speaker-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SpeakerListComponentRoutingModule,
  ],
  declarations: [SpeakerListComponent]
})
export class SpeakerListModule { }
