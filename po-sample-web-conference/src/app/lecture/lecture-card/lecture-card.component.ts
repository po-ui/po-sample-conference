import { Component, Input } from '@angular/core';

import { Lecture } from './../../model/lecture';

@Component({
  selector: 'lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent {

  /** Objeto do tipo Lecture referente a palestra. */
  @Input('lecture') lecture: Lecture = new Lecture();

  constructor() { }

  getCardDescription() {
    return this.lecture.startTime + ' - ' + this.lecture.endTime + ' : ' + this.lecture.room;
  }

}
