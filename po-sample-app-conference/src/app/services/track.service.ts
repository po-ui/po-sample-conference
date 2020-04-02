import { Injectable } from '@angular/core';

import { PoSyncService } from '@po-ui/ng-sync';

@Injectable({
  providedIn: 'root',
})
export class TrackService {

  constructor(private poSync: PoSyncService) {}

  async getTracks() {
    const tracksResponse: any = await this.poSync.getModel('Tracks').find().exec();
    return tracksResponse.items;
  }

  synchronize() {
    return this.poSync.sync();
  }

}
