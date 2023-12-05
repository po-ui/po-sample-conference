import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';

import { PrepareSyncService } from '../services/prepare-sync.service';

@Injectable({
  providedIn: 'root'
})
export class SyncResolver  {

constructor(private prepareSyncService: PrepareSyncService) { }

  resolve(): Observable<boolean> {
    return this.prepareSyncService.init();
  }

}
