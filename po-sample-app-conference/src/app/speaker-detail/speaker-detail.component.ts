import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { SpeakerService } from './../services/speaker.service';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.component.html',
  styleUrls: ['speaker-detail.component.scss'],

})
export class SpeakerDetailComponent {

  speaker;
  speakerId;
  syncPreparedSubscription: Subscription;
  onSyncSubscription: Subscription;


  constructor(
    public activatedRoute: ActivatedRoute,
    private speakerService: SpeakerService,
    private poSync: PoSyncService,

  ) { }

  ionViewWillEnter() {
    this.syncPreparedSubscription = this.activatedRoute.data.subscribe(() => {
      this.speakerId = this.activatedRoute.snapshot.paramMap.get('speakerId');
      this.loadSpeaker(this.speakerId);
    });

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadSpeaker(this.speakerId));
  }

  ionViewWillLeave() {
    this.onSyncSubscription.unsubscribe();
    this.syncPreparedSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.speakerService.synchronize().then(() => event.target.complete());
  }

  sendMail() {
    window.open('mailto:', this.speaker.email);
  }

  private loadSpeaker(speakerId) {

    this.speakerService.getSpeaker(speakerId).then(speaker => {
      this.speaker = speaker;
    });
  }

}
