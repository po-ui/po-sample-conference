import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { SyncResolver } from './resolvers/sync-resolver';

const routes: Routes = [
  {
    path: '',
    resolve: { syncPrepared: SyncResolver },
    children: [
      {
        path: '',
        redirectTo: '/schedule',
        pathMatch: 'full',
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'lecture-detail/:lectureId',
        loadChildren: () => import('./lecture-detail/lecture-detail.module').then(m => m.LectureDetailModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      }
    ]
  },
  // {
  //   path: 'app',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule),
  // },
  // {
  //   path: 'speakers',
  //   loadChildren: () => import('./speaker-list/speaker-list.module').then(m => m.SpeakerListModule),
  // },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  // },
  // {
  //   path: 'app',
  //   loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  // },
  // {
  //   path: 'tutorial',
  //   loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
  //   canLoad: [CheckTutorial]
  // }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [SyncResolver]
})
export class AppRoutingModule { }
