import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoTabsModule } from '@po-ui/ng-components';

import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule.routing';
import { ScheduleFilterComponent } from './schedule-filter/schedule-filter.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleFavoriteListComponent } from './schedule-favorite-list/schedule-favorite-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoTabsModule,
    ScheduleRoutingModule
  ],
  declarations: [ScheduleFavoriteListComponent, ScheduleListComponent, ScheduleComponent, ScheduleFilterComponent]
})
export class ScheduleModule { }
