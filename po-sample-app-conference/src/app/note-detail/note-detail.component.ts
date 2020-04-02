import { Component } from '@angular/core';

import { AlertController, NavController, NavParams, ToastController } from '@ionic/angular';

import { NoteListComponent } from './../note-list/note-list.component';
import { NoteService } from './../services/note.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.component.html'
})
export class NoteDetailComponent {
  note = { title: 'New note', text: null, lectureId: undefined, userId: undefined };

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private noteService: NoteService,
    private userService: UserService,
  ) { }

  ionViewDidLoad() {
    this.initNote();
  }

  async alertRemoveNote() {
    const alert = await this.alertCtrl.create({
      // title: `Remove ${this.note.title}`,
      message: 'Would you like to remove this note?',
      buttons: [
        { text: 'Cancel', handler: () => { } },
        { text: 'Remove', handler: () => this.removeNote() }
      ]
    });
    alert.present();
  }

  async saveNote() {
    this.note.lectureId = this.navParams.data.lectureId;
    this.note.userId = await this.userService.getLoggedUserId();

    await this.noteService.save(this.note);

    const toast = await this.toastCtrl.create({
      message: 'Saved note',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    // this.navCtrl.setRoot(NoteListPage);
  }

  private async initNote() {
    const note: any = await this.noteService.getNote(this.navParams.data.lectureId);
    this.note = note || this.note;
  }

  private async removeNote() {
    await this.noteService.remove(this.note);
    // this.navCtrl.setRoot(NoteListPage);
  }

}
