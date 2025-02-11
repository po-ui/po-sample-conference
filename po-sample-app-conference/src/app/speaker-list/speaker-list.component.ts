import { Component, OnDestroy } from '@angular/core';

import { ActionSheetController, Config } from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { SpeakerService } from './../services/speaker.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.component.html',
  styleUrls: ['speaker-list.component.scss'],
  standalone: false
})
export class SpeakerListComponent {
  speakers = [];
  onSyncSubscription: Subscription;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public config: Config,
    private speakerService: SpeakerService,
    private poSync: PoSyncService
  ) {}

  ionViewWillEnter() {
    this.getSpeakers();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.getSpeakers());
  }

  ionViewWillLeave() {
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.speakerService.synchronize().then(() => event.target.complete());
  }

  async openContact(speaker: any) {
    const mode = this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: speaker.email,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        }
      ]
    });

    await actionSheet.present();
  }

  private getSpeakers() {
    this.speakerService.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }
}
