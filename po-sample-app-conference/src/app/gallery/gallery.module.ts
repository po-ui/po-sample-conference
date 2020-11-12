import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhotoComponent } from './photo/photo.component';
import { GalleryRoutingModule } from './gallery.routing';

@NgModule({
  declarations: [GalleryComponent, PhotoComponent],
  imports: [CommonModule, FormsModule, IonicModule, GalleryRoutingModule]
})
export class GalleryModule {}
