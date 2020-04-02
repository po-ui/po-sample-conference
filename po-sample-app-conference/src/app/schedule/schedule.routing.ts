import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: 'favorite-list',
        loadChildren: () => import('./schedule-favorite-list/schedule-favorite-list.module').then(m => m.ScheduleFavoriteListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
