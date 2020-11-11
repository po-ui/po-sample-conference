import { Component } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { GalleryService } from '../services/gallery.service';
import { UserService } from '../services/user.service';
import { Photos } from './gallery.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  photos: Photos = [];
  onSyncSubscription: Subscription;
  photosSubscription: Subscription;
  isLogged = false;
  untitledImage: 'Untitled image';

  constructor(
    private galleryService: GalleryService,
    private poSync: PoSyncService,
    private userService: UserService) {
    this.userService.getLoggedUserId().then(user => this.isLogged = !!user);
  }

  ionViewWillEnter() {
    this.loadPhotos();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadPhotos());
  }

  ionViewWillLeave() {
    this.onSyncSubscription?.unsubscribe();
    this.photosSubscription?.unsubscribe();
  }

  async loadPhotos() {
    this.photosSubscription = this.galleryService.list().subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      if (this.photos !== data['items']) {
        // tslint:disable-next-line:no-string-literal
        this.photos = data['items'].filter(item => item.deleted === false);
      }
    });
  }

  setSRCImage(fileName: string) {
    return `${environment.apiURL}/files/${fileName}`;
  }
}
