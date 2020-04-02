import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { PoSyncService } from '@po-ui/ng-sync';

import { UserService } from './../services/user.service';
import { LectureService } from '../services/lecture.service';

@Component({
  selector: 'page-lecture-detail',
  templateUrl: 'lecture-detail.component.html'
})
export class LectureDetailComponent implements OnDestroy {

  lecture;
  isLogged = false;
  lectureId;
  syncPreparedSubscription: Subscription;
  onSyncSubscription: Subscription;

  constructor(
    public activatedRoute: ActivatedRoute,
    private lectureService: LectureService,
    private poSync: PoSyncService,
    private userService: UserService,
  ) {
    this.userService.getLoggedUserId().then(user => this.isLogged = !!user);
  }

  ionViewWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(() => {
      this.lectureId = this.activatedRoute.snapshot.paramMap.get('lectureId');
      this.loadLecture(this.lectureId);
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadLecture(this.lectureId));
  }

  ngOnDestroy(): void {
    this.syncPreparedSubscription.unsubscribe();
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.lectureService.synchronize().then(() => event.target.complete());
  }

  goToNoteDetail() {
    // this.navCtrl.push(NoteDetailPage, { lectureId: this.lecture.id });
  }

  private loadLecture(lectureId) {
    this.lectureService.getLecture(lectureId).then(lecture => {
      this.lecture = lecture;
    });
  }

}
