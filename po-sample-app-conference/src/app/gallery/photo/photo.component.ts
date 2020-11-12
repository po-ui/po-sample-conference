import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  lectureId;
  photo = { id: undefined, title: 'New note', text: null, lectureId: undefined, userId: undefined };
  onSyncSubscription: Subscription;
  syncPreparedSubscription: Subscription;

  constructor(
    public alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public toastCtrl: ToastController,
    private poSync: PoSyncService,
    private router: Router,
    private galleryService: GalleryService,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(() => {
      this.lectureId = this.activatedRoute.snapshot.paramMap.get('noteId');
      this.loadNote(this.lectureId);
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadNote(this.lectureId));
  }

  ionViewWillLeave() {
    this.syncPreparedSubscription.unsubscribe();
    this.onSyncSubscription.unsubscribe();
  }

  async alertRemovePhoto() {
    const alert = await this.alertCtrl.create({
      header: `Remove ${this.photo.title}`,
      message: 'Would you like to remove this note?',
      buttons: [
        { text: 'Cancel', handler: () => {} },
        { text: 'Remove', handler: () => this.removeNote() }
      ]
    });
    alert.present();
  }

  async savePhoto() {
    this.photo.lectureId = this.lectureId;
    this.photo.userId = await this.userService.getLoggedUserId();

    await this.galleryService.save(this.photo);

    const toast = await this.toastCtrl.create({
      message: 'Saved note',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();

    this.router.navigate(['/notes']);
  }

  private async loadNote(lectureId) {
    const note: any = await this.galleryService.getNote(lectureId);
    this.photo = note || this.photo;
  }

  private async removeNote() {
    await this.galleryService.remove(this.photo);
    this.router.navigate(['/notes']);
  }
}
