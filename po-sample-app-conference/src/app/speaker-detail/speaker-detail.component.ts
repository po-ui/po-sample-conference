import { Component, OnDestroy } from '@angular/core';

import { NavController, NavParams } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { SpeakerService } from './../services/speaker.service';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.component.html'
})
export class SpeakerDetailComponent implements OnDestroy {

  speaker;
  onSyncSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speakerService: SpeakerService,
    private poSync: PoSyncService,
  ) { }

  ionViewWillEnter() {
    this.loadSpeaker();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.loadSpeaker());
  }

  ngOnDestroy(): void {
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.speakerService.synchronize().then(() => event.target.complete());
  }

  sendMail() {
    window.open('mailto:', this.speaker.email);
  }

  private loadSpeaker() {
    this.poSync.getModel('Speakers').findById(this.navParams.data.speakerId).exec().then(speaker => {
      this.speaker = speaker;
    });
  }

}
