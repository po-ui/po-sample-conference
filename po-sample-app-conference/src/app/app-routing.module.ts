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
        pathMatch: 'full'
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'lecture-detail/:lectureId',
        loadChildren: () => import('./lecture-detail/lecture-detail.module').then(m => m.LectureDetailModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
      },
      {
        path: 'speakers',
        loadChildren: () => import('./speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
      },
      {
        path: 'speaker-detail/:speakerId',
        loadChildren: () => import('./speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
      },
      {
        path: 'notes',
        loadChildren: () => import('./note-list/note-list.module').then(m => m.NoteListModule)
      },
      {
        path: 'note-detail/:noteId',
        loadChildren: () => import('./note-detail/note-detail.module').then(m => m.NoteDetailModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [SyncResolver]
})
export class AppRoutingModule {}
