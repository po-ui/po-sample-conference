import { NgModule } from '@angular/core';

import { ConferenceCardComponent } from './conference-card/conference-card.component';
import { ConferenceComponent } from './conference.component';
import { ConferenceRoutingModule } from './conference-routing.module';
import { ConferenceService } from './conference.service';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ConferenceRoutingModule
  ],
  declarations: [
    ConferenceCardComponent,
    ConferenceComponent
  ],
  providers: [
    ConferenceService
  ]
})
export class ConferenceModule { }
