import { Component, OnDestroy } from '@angular/core';

import {
  ActionSheetController,
  Config,
  NavController
} from '@ionic/angular';

import { PoSyncService } from '@po-ui/ng-sync';
import { Subscription } from 'rxjs';

import { SpeakerService } from './../services/speaker.service';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.component.html'
})
export class SpeakerListComponent implements OnDestroy {

  // actionSheet: ActionSheet;
  speakers = [];
  onSyncSubscription: Subscription;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
    private speakerService: SpeakerService,
    private poSync: PoSyncService
  ) {}

  ionViewWillEnter() {
    this.getSpeakers();

    this.onSyncSubscription = this.poSync.onSync().subscribe(() => this.getSpeakers());
  }

  ngOnDestroy(): void {
    this.onSyncSubscription.unsubscribe();
  }

  doRefresh(event) {
    this.speakerService.synchronize().then(() => event.target.complete());
  }

  goToLectureDetail(lecture: any) {
    // this.navCtrl.push(LectureDetailPage, { lectureId: lecture.id });
  }

  goToSpeakerDetail(speaker: any) {
    // this.navCtrl.push(SpeakerDetailPage, { speakerId: speaker.id });
  }

  async openContact(speaker: any) {
    const mode = this.config.get('mode');

    // const actionSheet = await this.actionSheetCtrl.create({
    //   title: 'Contact ' + speaker.name,
    //   buttons: [
    //     {
    //       text: speaker.email,
    //       icon: mode !== 'ios' ? 'mail' : null,
    //       handler: () => {
    //         window.open('mailto:' + speaker.email);
    //       }
    //     } as ActionSheetButton
    //   ]
    // } as ActionSheetOptions);

    // actionSheet.present();
  }

  private getSpeakers() {
    this.speakerService.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

}
