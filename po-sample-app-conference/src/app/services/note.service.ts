import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private poSync: PoSyncService, private userService: UserService) {}

  getNoteModel() {
    return this.poSync.getModel('Notes');
  }

  async getNote(lectureId) {
    const notes = await this.getNotes();
    return notes.find((note: any) => note.lectureId === lectureId);
  }

  async getNotes() {
    const user: any = await this.userService.getLoggedUser();
    const notes: any = await this.getNoteModel().find().exec();
    return notes.items.filter((note: any) => note.userId === user.id);
  }

  remove(note) {
    return this.getNoteModel().remove(note);
  }

  save(note) {
    return this.getNoteModel().save(note);
  }

  synchronize() {
    return this.poSync.sync();
  }

}
