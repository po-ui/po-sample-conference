import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Events {

  private eventSubject = new Subject<string>();

  publish(event: string) {
    this.eventSubject.next(event);
  }

  get(): Subject<string> {
    return this.eventSubject;
  }

}
