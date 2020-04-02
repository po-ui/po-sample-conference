import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { PrepareSyncService } from '../services/prepare-sync.service';

@Injectable({
  providedIn: 'root'
})
export class SyncResolver implements Resolve<Observable<boolean>> {

constructor(private prepareSyncService: PrepareSyncService) { }

  resolve(): Observable<boolean> {
    return this.prepareSyncService.init();
  }

}
