import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScheduleFavoriteListComponent } from './schedule-favorite-list.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleFavoriteListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleFavoriteListComponentRoutingModule { }
