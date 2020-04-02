import { Component, OnDestroy } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { ConferenceService } from './../services/conference.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnDestroy {

  conference;
  onSyncSubscription: Subscription;

  constructor(private conferenceService: ConferenceService, private poSync: PoSyncService) { }

  ionViewWillEnter() {
    this.loadConference();
    this.onSyncSubscription = this.poSync.onSync().subscribe(() => {
      this.loadConference();
    });
  }

  ngOnDestroy(): void {
    this.onSyncSubscription.unsubscribe();
  }

  async loadConference() {
    this.conference = await this.conferenceService.getConference();
  }

}
