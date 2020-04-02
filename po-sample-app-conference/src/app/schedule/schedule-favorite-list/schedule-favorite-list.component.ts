import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController, NavParams, ToastController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { UserService } from './../../services/user.service';

@Component({
  selector: 'schedule-favorite-list',
  templateUrl: 'schedule-favorite-list.component.html'
})
export class ScheduleFavoriteListComponent implements OnDestroy {

  favoriteAll: boolean;
  lectures;
  lecturesFavorited: Array<number> = [];
  lecturesListToFavor: Array<number> = [];
  selectAllLectures: boolean;
  syncPreparedSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private userService: UserService
  ) { }

  ionVieWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(data => {
      this.lectures = data.lectures;
      this.lecturesFavorited = data.favoriteLectures || [];
      this.favoriteAll = this.checkFavoriteAll();
    });
  }

  ngOnDestroy(): void {
    this.syncPreparedSubscription.unsubscribe();
  }

  addLisToFavor(lectureId) {
    const indexLecture = this.lecturesListToFavor.indexOf(lectureId);

    if (indexLecture < 0) {
      this.lecturesListToFavor.push(lectureId);
    } else {
      this.lecturesListToFavor.splice(indexLecture, 1);
    }
  }

  checkFavoriteAll() {
    return !this.lectures.some(lecture => this.lecturesFavorited.indexOf(lecture.id) < 0);
  }

  async favoriteLectures() {
    try {
      await this.userService.addFavoriteLectureList(this.lecturesListToFavor);
      // this.navCtrl.setRoot(SchedulePage);
    } catch (error) {
      this.createToast(error);
    }

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
