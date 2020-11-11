import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { PoHttpRequestData, PoHttpRequestType, PoSyncService } from '@po-ui/ng-sync';
import { PoUploadComponent } from '@po-ui/ng-components';
import { PoUploadFile } from '@po-ui/ng-components/lib/components/po-field/po-upload/po-upload-file';

import { GalleryService } from 'src/app/services/gallery.service';
import { Photo } from '../gallery.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  photoId;
  syncPreparedSubscription: Subscription;
  photoFile: Array<PoUploadFile>;
  urlImage = `${environment.apiURL}/gallery/photo/file`;
  photosSubscription: Subscription;
  literals;
  title = 'New Photo';
  save = 'Salvar';
  photoName: string;
  deletePhotoSubscription: Subscription;
  restrictions = { allowedExtensions: ['.png', '.jpg'] };

  // tslint:disable-next-line:variable-name
  private _photo: Photo = {};

  @Input() photoTitle: string;

  @ViewChild('upload', { static: true }) upload: PoUploadComponent;

  set photo(value: Photo) {
    this._photo = value;
  }

  get photo(): Photo {
    return this._photo;
  }

  get isEdition(): boolean {
    return !!this.photoId;
  }

  constructor(
    public alertCtrl: AlertController,
    public activatedRoute: ActivatedRoute,
    public toastCtrl: ToastController,
    private poSync: PoSyncService,
    private router: Router,
    private galleryService: GalleryService,
  ) {}

  ionViewWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(() => {
      this.photoId = this.activatedRoute.snapshot.paramMap.get('photoId');

      if (this.isEdition) {
        this.prepareForEditing();
      }
    });

    this.literals = {
      selectFile: 'select an image'
    };
  }

  private prepareForEditing() {
    this.title = 'Edit Photo';
    this.save = 'Save change';
    this.getPhoto();
  }

  private getPhoto() {
    this.photosSubscription = this.galleryService.getPhoto(this.photoId).subscribe(data => {
      this.photo = data;
    });
  }

  ionViewWillLeave() {
    this.syncPreparedSubscription?.unsubscribe();
    this.photosSubscription?.unsubscribe();
    this.deletePhotoSubscription?.unsubscribe();
  }

  async prepareToSend() {
    if (this.photoFile) {
      const [poFile] = this.photoFile;
      const url = this.photo.title ? `${this.urlImage}/${this.photo.title}` : `${this.urlImage}/${this.photoId}`;

      let requestData: PoHttpRequestData = {
        url,
        method: PoHttpRequestType.POST,
        body: poFile.rawFile,
        formField: 'file'
      };

      if (this.isEdition) {
        const editURL = this.photo.title ? `${this.urlImage}/${this.photoId}/${this.photo.title}` : `${this.urlImage}/${this.photoId}`;

        requestData = {
          url: editURL,
          method: PoHttpRequestType.PUT,
          body: poFile.rawFile,
          formField: 'file'
        };
      }

      await this.sendFile(requestData, poFile);
    }
  }

  private async sendFile(requestData: PoHttpRequestData, poFile: PoUploadFile) {
    this.poSync.insertHttpCommand(requestData, poFile.rawFile.name);
    this.router.navigate(['/gallery']);

    const toast = await this.toastCtrl.create({
      message: 'Saved photo',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  getSRCImage(fileName) {
    if (fileName) {
      return `${environment.apiURL}/files/${fileName}`;
    }
  }

  async delete(photoID) {
    const alert = await this.alertCtrl.create({
      message: 'Would you like to remove this photo?',
      buttons: [
        { text: 'Cancel', handler: () => { } },
        { text: 'Remove', handler: () => this.deletePhoto(photoID) }
      ]
    });
    alert.present();
  }

  private deletePhoto(photoID) {
    this.deletePhotoSubscription = this.galleryService.deletePhoto(photoID).subscribe(async () => {
      this.router.navigate(['/gallery']);
      const toast = await this.toastCtrl.create({
        message: 'Deleted photo',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
}
