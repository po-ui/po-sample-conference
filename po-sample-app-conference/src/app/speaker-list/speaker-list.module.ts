import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SpeakerListComponentRoutingModule } from './speaker-list.routing';
import { SpeakerListComponent } from './speaker-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScrollingModule,
    SpeakerListComponentRoutingModule,
  ],
  declarations: [SpeakerListComponent]
})
export class SpeakerListModule { }
