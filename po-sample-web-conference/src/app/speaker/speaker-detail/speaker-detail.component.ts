import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { PoDialogService, PoNotificationService } from "@po-ui/ng-components";

import { Lecture } from "../../model/lecture";
import { LectureService } from "../../lecture/lecture.service";
import { Speaker } from "../../model/speaker";
import { SpeakerService } from "../speaker.service";

@Component({
  selector: "app-speaker-detail",
  templateUrl: "./speaker-detail.component.html",
  styleUrls: ["./speaker-detail.component.css"],
  standalone: false,
})
export class SpeakerDetailComponent implements OnInit {
  lectures: Array<Lecture> = new Array<Lecture>();
  speaker: Speaker = new Speaker();
  title: string;

  constructor(
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private poAlert: PoDialogService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getSpeakerById(params["id"].toString());
      }
    });
  }

  back() {
    window.history.back();
  }

  edit() {
    this.navigateToPath(`home/speakers/edit/${this.speaker.id}`);
  }

  getSpeakerById(id: string) {
    this.speakerService.getById(id).subscribe(
      (speaker) => {
        this.speaker = speaker;
        this.title = `Speaker ${this.speaker.name} detail`;

        this.getLecturesForSpeaker();
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  remove() {
    this.poAlert.confirm({
      title: "Do you want to delete this speaker?",
      message: `Are you sure you want to delete the ${this.speaker.name} speaker?`,
      confirm: () => {
        this.speakerService.delete(this.speaker.id).subscribe(
          (speakerId) => {
            this.poNotification.success(`Speaker deleted successfully!`);
            this.navigateToPath("home/speakers");
          },
          (error) => {
            this.poNotification.error(error.status + " " + error.statusText);
          }
        );
      },
      cancel: undefined,
    });
  }

  private getLecturesForSpeaker() {
    if (this.speaker) {
      this.speaker.lectures.forEach((lecture) => {
        this.lectureService.getById(lecture.id).subscribe((lect) => {
          this.lectures.push(lect);
        });
      });
    }
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
