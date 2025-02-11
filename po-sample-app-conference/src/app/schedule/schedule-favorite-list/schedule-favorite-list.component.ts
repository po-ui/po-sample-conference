import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToastController, ModalController } from '@ionic/angular';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'schedule-favorite-list',
  templateUrl: 'schedule-favorite-list.component.html',
  standalone: false
})
export class ScheduleFavoriteListComponent {
  @Input() lectures;
  @Input() favorites;

  favoriteAll: boolean;
  lecturesListToFavor: Array<number> = [];
  selectAllLectures: boolean;

  constructor(
    public modalCtrl: ModalController,
    public activatedRoute: ActivatedRoute,
    public toastCtrl: ToastController,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    this.favoriteAll = this.checkFavoriteAll();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  addLisToFavor(lectureId) {
    const indexLecture = this.lecturesListToFavor?.indexOf(lectureId);

    if (indexLecture < 0) {
      this.lecturesListToFavor.push(lectureId);
    } else {
      this.lecturesListToFavor.splice(indexLecture, 1);
    }
  }

  checkFavoriteAll() {
    return !this.lectures.some(lecture => this.favorites?.indexOf(lecture.id) < 0);
  }

  favoriteLectures() {
    if (!this.lecturesListToFavor?.length) {
      this.dismiss();
    }

    this.userService.addFavoriteLectureList(this.lecturesListToFavor).then(
      () => {
        this.dismiss();
      },
      error => {
        this.createToast(error);
      }
    );
  }

  selectAll() {
    this.selectAllLectures = !this.selectAllLectures;
  }

  private async createToast(message) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      cssClass: 'toaster'
    });
    toast.present();
  }
}
