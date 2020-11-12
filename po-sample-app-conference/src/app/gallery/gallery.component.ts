import { Component, OnInit } from '@angular/core';
import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  photos = [];
  onSyncSubscription: Subscription;

  constructor(private galleryService: GalleryService, private poSync: PoSyncService) {}

  ionViewWillEnter() {
    this.loadPhotos();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadPhotos());
  }

  ionViewWillLeave() {
    this.onSyncSubscription.unsubscribe();
  }

  async loadPhotos() {
    this.photos = await this.galleryService.getNotes();
  }

  doRefresh(event) {
    this.galleryService.synchronize().then(() => event.target.complete());
  }
}
