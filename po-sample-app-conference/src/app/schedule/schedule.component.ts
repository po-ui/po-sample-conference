import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LectureService } from './../services/lecture.service';
import { ScheduleFilterComponent } from './schedule-filter/schedule-filter.component';
import { UserService } from './../services/user.service';
import { Events } from '../services/events.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnDestroy {

  excludeTracks: any = [];
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
    public activatedRoute: ActivatedRoute,
    private lectureService: LectureService,
    private userService: UserService,
    private poSync: PoSyncService,
    private events: Events
  ) { }

  ionViewWillEnter(): void {
    this.syncPrepared = this.activatedRoute.data.subscribe(() => {
      this.updateSchedule();

      this.userId = this.userService.getLoggedUser().then(user => {
        this.userId = user;
      });
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => {
      this.updateSchedule();
    });

    this.events.get()
      .pipe(filter(event => event === 'user:logout'))
      .subscribe(() => {
        this.userId = undefined;

        this.onClickTab('all');
      });
  }

  ngOnDestroy(): void {
    this.syncPrepared.unsubscribe();
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.lectureService.synchronize().then(() => event.target.complete());
  }

  onClickTab(tab: string) {
    this.segment = tab.toLowerCase();

    this.lectureFilter();
  }

  lectureFilter() {
    const lectures = this.lectures.filter((lecture) => {
      const isNotExcludeTrack = !this.excludeTracks.includes(lecture.track.name);
      const isEqualQueryText = lecture.title.toLowerCase().includes(this.queryText);

      return this.queryText ? isEqualQueryText && isNotExcludeTrack : isNotExcludeTrack;
    });

    if (this.segment === 'favorites') {
      this.lectureFavoriteFilter(lectures).then(favoriteLectures => {
        this.filteredLectures = favoriteLectures;
      });
    } else {
      this.filteredLectures = lectures;
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

  async lectureFavoriteFilter(lectures) {
    const favoriteLectures = await this.userService.getFavoriteLectures();

    return lectures.filter((lecture) => favoriteLectures && favoriteLectures.includes(lecture.id));
  }

  private updateSchedule() {
    this.lectureService.getLectures().then((lectures) => {
      this.lectures = lectures;
      this.lectureFilter();
    });
  }

}
