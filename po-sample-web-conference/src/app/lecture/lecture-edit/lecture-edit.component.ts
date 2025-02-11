import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { PoNotificationService, PoSelectOption } from "@po-ui/ng-components";

import { Lecture } from "./../../model/lecture";
import { LectureService } from "../lecture.service";
import { Speaker } from "./../../model/speaker";
import { SpeakerService } from "../../speaker/speaker.service";
import { Track } from "../../model/track";
import { TrackService } from "./../../track/track.service";

@Component({
  selector: "app-lecture-edit",
  templateUrl: "./lecture-edit.component.html",
  styleUrls: ["./lecture-edit.component.css"],
  standalone: false,
})
export class LectureEditComponent implements OnInit {
  isUpdate: boolean = false;
  speakerOptions: Array<PoSelectOption> = [];
  speakers: Array<Speaker> = [];
  title: string = "Create lecture";
  trackOptions: Array<PoSelectOption> = [];
  tracks: Array<Track> = [];

  /** Objeto do tipo Lecture referente a palestra. */
  @Input("lecture") lecture: Lecture = new Lecture();

  constructor(
    private route: ActivatedRoute,
    private lectureService: LectureService,
    private router: Router,
    private speakerService: SpeakerService,
    private poNotification: PoNotificationService,
    private trackService: TrackService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"]) {
        this.getLectureById(params["id"].toString());
      }
    });

    this.trackService.get().subscribe((trackResponse) => {
      trackResponse.items.forEach((track) => {
        if (track.deleted === false) {
          this.trackOptions = [
            ...this.trackOptions,
            { value: track.id, label: track.name },
          ];
          this.tracks = [...this.tracks, track];
        }
      });

      if (this.isUpdate) {
        this.lecture.trackId = this.lecture.track.id;
      }
    });

    this.speakerService.get().subscribe((speakerResponse) => {
      speakerResponse.items.forEach((speaker) => {
        if (speaker.deleted === false) {
          this.speakerOptions = [
            ...this.speakerOptions,
            { value: speaker.id, label: speaker.name },
          ];
          this.speakers = [...this.speakers, speaker];
        }
      });

      if (this.isUpdate) {
        this.lecture.speakerId = this.lecture.speaker.id;
      }
    });
  }

  cancel() {
    this.navigateToPath("home/lectures");
  }

  create() {
    this.lectureService.post(this.lecture).subscribe(
      (lecture) => {
        this.poNotification.success(
          `Lecture ${lecture.title} created successfully!`
        );
        this.navigateToPath("home/lectures");
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  edit() {
    this.lectureService.put(this.lecture).subscribe(
      (lecture) => {
        this.poNotification.success(
          `Lecture ${lecture.title} updated successfully!`
        );
        this.navigateToPath("home/lectures");
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  getLectureById(id: string) {
    this.lectureService.getById(id).subscribe(
      (lecture) => {
        this.lecture = lecture;

        this.title = `Edit lecture ${this.lecture.title}`;
        this.isUpdate = true;
      },
      (error) => {
        this.poNotification.error(error.status + " " + error.statusText);
      }
    );
  }

  getSpeakerImage(speakerId: string) {
    return this.speakers.find((speaker) => speaker.id === speakerId).photo;
  }

  getTrackColor(trackId: string) {
    return this.tracks.find((track) => track.id === trackId).color;
  }

  save() {
    this.transformTimeMaskLecture();
    if (this.isUpdate) {
      this.edit();
    } else {
      this.create();
    }
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }

  private transformTimeMaskLecture() {
    if (!this.lecture.startTime.includes(":")) {
      const hourStartTime = this.lecture.startTime.substring(2, 0).concat(":");
      const minuteStartTime = this.lecture.startTime
        .substring(4, 2)
        .concat(":");
      const secondStartTime = this.lecture.startTime.substring(4, 6);

      this.lecture.startTime = hourStartTime
        .concat(minuteStartTime)
        .concat(secondStartTime);
    }

    if (!this.lecture.endTime.includes(":")) {
      const hourEndTime = this.lecture.endTime.substring(2, 0).concat(":");
      const minuteEndTime = this.lecture.endTime.substring(4, 2).concat(":");
      const secondEndTime = this.lecture.endTime.substring(4, 6);

      this.lecture.endTime = hourEndTime
        .concat(minuteEndTime)
        .concat(secondEndTime);
    }
  }
}
