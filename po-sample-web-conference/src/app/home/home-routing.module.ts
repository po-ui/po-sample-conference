import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LectureEditComponent } from '../lecture/lecture-edit/lecture-edit.component';
import { LectureDetailComponent } from '../lecture/lecture-detail/lecture-detail.component';
import { LectureComponent } from '../lecture/lecture.component';
import { SpeakerEditComponent } from '../speaker/speaker-edit/speaker-edit.component';
import { SpeakerComponent } from '../speaker/speaker.component';
import { SpeakerDetailComponent } from '../speaker/speaker-detail/speaker-detail.component';

import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeDashboardComponent },
      {
        path: 'lectures',
        children: [
          { path: '', component: LectureComponent },
          { path: 'create', component: LectureEditComponent },
          { path: 'detail/:id', component: LectureDetailComponent },
          { path: 'edit/:id', component: LectureEditComponent }
        ]
      },
      { path: 'conferences', loadChildren: () => import('./../conference/conference.module').then(m => m.ConferenceModule) },
      {
        path: 'speakers',
        children: [
          { path: '', component: SpeakerComponent },
          { path: 'create', component: SpeakerEditComponent },
          { path: 'detail/:id', component: SpeakerDetailComponent },
          { path: 'edit/:id', component: SpeakerEditComponent }
        ]
      },
      { path: 'tracks', loadChildren: () => import('./../track/track.module').then(m => m.TrackModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
