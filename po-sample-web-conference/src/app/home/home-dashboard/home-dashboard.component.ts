import { Component, OnInit } from '@angular/core';

import { LectureService } from '../../lecture/lecture.service';
import { NoteService } from '../../note/note.service';
import { SpeakerService } from '../../speaker/speaker.service';
import { TrackService } from '../../track/track.service';

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  entityCardList: Array<{ count: number, icon: string, name: string }> = [];

  constructor(
    private lectureService: LectureService,
    private noteService: NoteService,
    private speakerService: SpeakerService,
    private trackService: TrackService) { }

  ngOnInit() {
    this.getCountLectures();
    this.getCountSpeakers();
    this.getCountTracks();
    this.getCountNotes();
  }

  getCountLectures(): void {
    this.lectureService.getCount().subscribe(length => {
      this.entityCardList.push({ count: length, icon: 'po-icon-chat', name: 'lectures' });
    });
  }

  getCountSpeakers(): void {
    this.speakerService.getCount().subscribe(length => {
      this.entityCardList.push({ count: length, icon: 'po-icon-user', name: 'speakers' });
    });
  }

  getCountTracks() {
    this.trackService.getCount().subscribe(length => {
      this.entityCardList.push({ count: length, icon: 'po-icon-stock', name: 'tracks' });
    });
  }

  getCountNotes() {
    this.noteService.getCount().subscribe(length => {
      this.entityCardList.push({ count: length, icon: 'po-icon-document', name: 'notes' });
    });
  }

}
