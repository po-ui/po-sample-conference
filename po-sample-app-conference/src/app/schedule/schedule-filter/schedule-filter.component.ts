import { Component, Input, OnDestroy } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { TrackService } from './../../services/track.service';

@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.component.html',
  styleUrls: ['schedule-filter.component.scss']
})
export class ScheduleFilterComponent {

  tracks: Array<{name: string, isChecked: boolean, color: string}> = [];

  onSyncSubscription: Subscription;

  @Input() excludeTracks;

  constructor(
    public modalCtrl: ModalController,
    private trackService: TrackService,
    private poSync: PoSyncService) { }

  ionViewWillEnter() {
    this.getTracks();

    this.onSyncSubscription =  this.poSync.onSync().subscribe(() => this.getTracks());
  }

  ionViewWillLeave() {
    this.onSyncSubscription.unsubscribe();
  }

  applyFilters() {
    const excludedTrackNames = this.tracks
      .filter(track => !track.isChecked)
      .map(track => track.name);

    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  doRefresh(event) {
    this.trackService.synchronize().then(() => event.target.complete());
  }

  getTracks() {
    this.trackService.getTracks().then(tracks => {
      this.tracks = tracks.map((track: any) => {
        return {
          name: track.name,
          color: track.color,
          isChecked: !this.excludeTracks.includes(track.name)
        };
      });
    });
  }

  resetFilters() {
    this.tracks.forEach(track => track.isChecked = true);
  }

}
