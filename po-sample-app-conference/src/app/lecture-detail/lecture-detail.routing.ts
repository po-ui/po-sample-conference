import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LectureDetailComponent } from './lecture-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LectureDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LectureDetailComponentRoutingModule { }

