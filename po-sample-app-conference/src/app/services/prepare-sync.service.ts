import { Injectable } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PoSyncConfig, PoNetworkType, PoSyncService } from '@po-ui/ng-sync';
import { PoStorageService } from '@po-ui/ng-storage';

import { schemas } from 'src/schemas/schemas-list.constants';

@Injectable({
  providedIn: 'root',
})
export class PrepareSyncService {
  constructor(
    private poSync: PoSyncService,
    private poStorage: PoStorageService
  ) {}

  init(): Observable<boolean> {
    const config: PoSyncConfig = {
      type: [PoNetworkType.ethernet, PoNetworkType.wifi],
      period: 10
    };

    return from(this.poSync.prepare(schemas, config)).pipe(
      switchMap(() => {
        return this.checkDataInitial();
      })
    );
  }

  private checkDataInitial(): Observable<boolean> {
    return from(this.poStorage.get('firstLoad')).pipe(
      switchMap((firstLoad) => {
        if (firstLoad) {
          return of(true);
        } else {
          return this.loadDataInitial();
        }
      })
    );
  }

  private loadDataInitial(): Observable<boolean> {
    return this.poSync
      .loadData()
      .pipe(switchMap(() => from(this.poStorage.set('firstLoad', true))));
  }
}
