import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ScheduleFavoriteListComponent } from './schedule-favorite-list.component';
import { ScheduleFavoriteListComponentRoutingModule } from './schedule-favorite-list.routing';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ScheduleFavoriteListComponentRoutingModule,
  ],
  declarations: [ScheduleFavoriteListComponent]
})
export class ScheduleFavoriteListModule { }
