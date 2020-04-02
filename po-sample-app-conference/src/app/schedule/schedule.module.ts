import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule.routing';
import { ScheduleFilterComponent } from './schedule-filter/schedule-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleRoutingModule
  ],
  declarations: [ScheduleComponent, ScheduleFilterComponent]
})
export class ScheduleModule { }
