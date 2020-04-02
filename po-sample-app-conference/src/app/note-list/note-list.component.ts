import { Component, OnDestroy } from '@angular/core';

import { NavController } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { NoteService } from './../services/note.service';

@Component({
  selector: 'page-notes',
  templateUrl: 'note-list.component.html'
})
export class NoteListComponent implements OnDestroy {
  notes = [];
  onSyncSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private noteService: NoteService,
    private poSync: PoSyncService
  ) { }

  ionViewDidLoad() {
    this.loadNotes();
    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadNotes());
  }

  ngOnDestroy(): void {
    this.onSyncSubscription.unsubscribe();
  }

  async loadNotes() {
    this.notes = await this.noteService.getNotes();
  }

  goToNoteDetail(lectureId) {
    // this.navCtrl.push(NoteDetailPage, { lectureId });
  }

  doRefresh(event) {
    this.noteService.synchronize().then(() => event.target.complete());
  }

}
