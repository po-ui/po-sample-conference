import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Observable } from 'rxjs';

import { Photo } from '../gallery/gallery.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  url = `${environment.apiURL}/gallery/photo`;

  constructor(private poSync: PoSyncService, private httpClient: HttpClient) {}

  getNoteModel() {
    return this.poSync.getModel('Notes');
  }

  save(photo: Photo) {
    return this.httpClient.post(this.url, photo);
  }

  list() {
    return this.httpClient.get(this.url);
  }

  getPhoto(photoId): Observable<any> {
    return this.httpClient.get(`${this.url}/${photoId}`);
  }

  synchronize() {
    return this.poSync.sync();
  }

  deletePhoto(photoId) {
    return this.httpClient.delete(`${this.url}/${photoId}`);
  }
}
