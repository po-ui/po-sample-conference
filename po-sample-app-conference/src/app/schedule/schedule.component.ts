import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { LectureService } from './../services/lecture.service';
import { ScheduleFilterComponent } from './schedule-filter/schedule-filter.component';
import { UserService } from './../services/user.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnDestroy {

  excludeTracks: any = [];
  favoriteSegment = 'favorites';
  filteredLectures = [];
  lectures = [];
  queryText = '';
  segment = 'all';
  userId;
  syncPrepared;
  onSyncSubscription: Subscription;

  constructor(
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private lectureService: LectureService,
    private userService: UserService,
    private poSync: PoSyncService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ionViewWillEnter(): void {
    this.syncPrepared = this.activatedRoute.data.subscribe(() => {
      this.updateSchedule();
      this.getUserId();
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => {
      this.updateSchedule();
    });
  }

  ngOnDestroy(): void {
    this.syncPrepared.unsubscribe();
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.lectureService.synchronize().then(() => event.target.complete());
  }

  getColorTrack(color) {
    return { 'border-left': `2px solid ${color}` };
  }

  lectureFilter() {
    const lectures = this.lectures.filter((lecture) => {
      const isNotExcludeTrack = !this.excludeTracks.includes(lecture.track.name);
      const isEqualQueryText = lecture.title.toLowerCase().includes(this.queryText);

      return this.queryText ? isEqualQueryText && isNotExcludeTrack : isNotExcludeTrack;
    });

    if (this.segment === this.favoriteSegment) {
      this.lectureFavoriteFilter(lectures).then(
        (favoriteLectures) => (this.filteredLectures = favoriteLectures)
      );
    } else {
      this.filteredLectures = lectures;
    }
  }

  async lecturePress() {
    if (this.userId) {
      const favoriteLectures = await this.userService.getFavoriteLectures();
      // this.router.navigate(ScheduleFavoriteListComponent, { lectures: this.lectures, favoriteLectures });
    }
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterComponent,
      componentProps: { excludeTracks: this.excludeTracks },
    });
    modal.present();

    modal.onWillDismiss().then(modalResponse => {
      if (modalResponse && modalResponse.data) {
        this.excludeTracks = modalResponse.data;
        this.lectureFilter();
      }
    });
  }

  private getUserId() {
    this.userService.getLoggedUser().then((user) => (this.userId = user));
  }

  private async lectureFavoriteFilter(lectures) {
    const favoriteLectures = await this.userService.getFavoriteLectures();
    return lectures.filter((lecture) => favoriteLectures && favoriteLectures.includes(lecture.id));
  }

  private updateSchedule() {
    this.lectureService.getLectures().then((lectures) => {
      this.lectures = lectures;
      this.lectureFilter();
    });
  }

  // async removeFavorite(slidingItem: IonItemSliding, lectureId: any, header: string) {
  //   const alert = await this.alertCtrl.create({
  //     header,
  //     message: 'Would you like to remove this session from your favorites?',
  //     buttons: [
  //       { text: 'Cancel', handler: () => slidingItem.close() },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           this.userService.removeFavoriteLecture(lectureId).then(() => {
  //             this.lectureFilter();
  //             slidingItem.close();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // addFavorite(slidingItem: IonItemSliding, lecture) {
  //   this.userService.addFavoriteLectureList(lecture.id).then(async () => {
  //     const alert = await this.alertCtrl.create({
  //       header: 'Favorite Added',
  //       buttons: [{
  //         text: 'OK',
  //         handler: () => slidingItem.close()
  //       }]
  //     });
  //     await alert.present();

  //   }).catch(() => this.removeFavorite(slidingItem, lecture.id, lecture.title));

  // }

}
