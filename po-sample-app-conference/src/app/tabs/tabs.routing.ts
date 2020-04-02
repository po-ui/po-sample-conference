import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TabsComponent } from './tabs.component';
import { SyncResolver } from '../resolvers/sync-resolver';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    resolve: { syncPrepared: SyncResolver },
    children: [
      { path: 'schedule', children: [
        { path: '',
        loadChildren: () => import('../schedule/schedule.module').then(m => m.ScheduleModule)
      },
      ] },
      { path: 'speakers', children: [
        { path: '',
        loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
      },
      ] },
      {
        path: 'about', children: [{
        path: '',
        loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
        }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsComponentRoutingModule { }
