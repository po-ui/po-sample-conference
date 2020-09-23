import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

import { NoteService } from './../services/note.service';
import { UserService } from './../services/user.service';
import { Subscription } from 'rxjs';
import { PoSyncService } from '@po-ui/ng-sync';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.component.html',
  styleUrls: ['note-detail.component.scss'],
})
export class NoteDetailComponent {
  lectureId;
  note = { id: undefined, title: 'New note', text: null, lectureId: undefined, userId: undefined };
  onSyncSubscription: Subscription;
  syncPreparedSubscription: Subscription;

  constructor(
    public alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public toastCtrl: ToastController,
    private poSync: PoSyncService,
    private router: Router,
    private noteService: NoteService,
    private userService: UserService
  ) { }

  ionViewWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(() => {
      this.lectureId = this.activatedRoute.snapshot.paramMap.get('noteId');
      this.loadNote(this.lectureId);
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadNote(this.lectureId));
  }

  ngOnDestroy(): void {
    this.syncPreparedSubscription.unsubscribe();
    this.onSyncSubscription.unsubscribe();  
  }

  async alertRemoveNote() {
    const alert = await this.alertCtrl.create({
      header: `Remove ${this.note.title}`,
      message: 'Would you like to remove this note?',
      buttons: [
        { text: 'Cancel', handler: () => { } },
        { text: 'Remove', handler: () => this.removeNote() }
      ]
    });
    alert.present();
  }

  async saveNote() {
    this.note.lectureId = this.lectureId;
    this.note.userId = await this.userService.getLoggedUserId();

    await this.noteService.save(this.note);

    const toast = await this.toastCtrl.create({
      message: 'Saved note',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();

    this.router.navigate(['/notes']);
  }

  private async loadNote(lectureId) {
    const note: any = await this.noteService.getNote(lectureId);
    this.note = note || this.note;
  }

  private async removeNote() {
    await this.noteService.remove(this.note);
    this.router.navigate(['/notes']);
  }

}
