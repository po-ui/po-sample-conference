import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {

  constructor(private poSync: PoSyncService) {}

  async getSpeaker(speakerId) {
    return await this.poSync.getModel('Speakers').findById(speakerId).exec();
  }

  async getSpeakers() {
    const speakersResponse: any = await this.poSync.getModel('Speakers').find().sort('name').exec();
    return speakersResponse.items;
  }

  synchronize() {
    return this.poSync.sync();
  }

}
