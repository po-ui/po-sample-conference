import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {

  constructor(private poSync: PoSyncService) {}

  getConference() {
    return this.getConferenceModel().findOne().exec();
  }

  private getConferenceModel() {
    return this.poSync.getModel('Conferences');
  }

}
