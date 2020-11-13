import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PoUploadComponent } from '@po-ui/ng-components';
import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { UserService } from 'src/app/services/user.service';
import { Photo } from '../gallery.interface';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  lectureId;
  photo: Photo = {};
  onSyncSubscription: Subscription;
  syncPreparedSubscription: Subscription;
  photoFile = {};
  urlImage = 'http://localhost:3000/gallery/photo/file';

  @ViewChild('upload', { static: true }) upload: PoUploadComponent;

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
    });
  }

  ionViewWillLeave() {
    this.syncPreparedSubscription.unsubscribe();
    this.onSyncSubscription.unsubscribe();
  }

  resumeUploadSuccess(event) {
    console.log(event);
    console.log(this.photo);
    //this.galleryService.save(this.photo);
  }
  sendFiles() {
    console.log(this.photoFile);
    this.upload.sendFiles();
  }
}
