import { Component, OnDestroy } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { NoteService } from './../services/note.service';

@Component({
  selector: 'page-notes',
  templateUrl: 'note-list.component.html',
  styleUrls: ['note-list.component.scss']
})
export class NoteListComponent implements OnDestroy {
  notes = [];
  onSyncSubscription: Subscription;

  constructor(
    private noteService: NoteService,
    private poSync: PoSyncService
  ) { }

  ionViewWillEnter() {
    this.loadNotes();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadNotes());
  }

  async loadNotes() {
    this.notes = await this.noteService.getNotes();
  }

  ngOnDestroy(): void {
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.noteService.synchronize().then(() => event.target.complete());
  }

}
