import { Injectable } from '@angular/core';

import { PoEntity } from '@po-ui/ng-sync';
import { PoResponseApi, PoSyncService } from '@po-ui/ng-sync';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  lectureModel: PoEntity;
  lectures;

  constructor(private poSync: PoSyncService) { }

  async getLecture(lectureId) {
    return await this.poSync.getModel('Lectures').findById(lectureId).exec();
  }

  getLectures() {
    return this.poSync
      .getModel('Lectures')
      .find()
      .sort('title')
      .exec()
      .then((data: PoResponseApi) => (this.lectures = data.items));
  }

  synchronize() {
    return this.poSync.sync();
  }
}
