import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Photo } from '../gallery/gallery.interface';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url = 'http://localhost:3000/gallery/photo';

  constructor(private poSync: PoSyncService, private httpClient: HttpClient) {}

  getNoteModel() {
    return this.poSync.getModel('Notes');
  }

  save(photo: Photo) {
    return this.httpClient.post(this.url, photo);
    //return this.getNoteModel().save(note);
  }

  synchronize() {
    return this.poSync.sync();
  }
}
