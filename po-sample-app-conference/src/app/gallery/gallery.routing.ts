import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent
  },
  {
    path: 'photo',
    component: PhotoComponent
  },
  {
    path: 'photo/:photoId',
    component: PhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {}
