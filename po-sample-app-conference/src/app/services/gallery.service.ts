import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Photo } from '../gallery/gallery.interface';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private poSync: PoSyncService, private httpClient: HttpClient) {}

  getNoteModel() {
    return this.poSync.getModel('Notes');
  }

  async getNote(lectureId) {
    const notes = await this.getNotes();
    return notes.find((note: any) => note.lectureId === lectureId);
  }

  save(photo: Photo) {
    this.httpClient.post()
    //return this.getNoteModel().save(note);
  }

  synchronize() {
    return this.poSync.sync();
  }
}
