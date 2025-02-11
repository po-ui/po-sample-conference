import { Component, OnInit, ViewChild } from "@angular/core";

import {
  PoModalComponent,
  PoSwitchLabelPosition,
  PoModalAction,
  PoPageAction,
  PoPageFilter,
} from "@po-ui/ng-components";

import { Lecture } from "./../model/lecture";
import { LectureService } from "./lecture.service";
import { TrackService } from "../track/track.service";

@Component({
  selector: "app-lecture",
  templateUrl: "./lecture.component.html",
  styleUrls: ["./lecture.component.css"],
  standalone: false,
})
export class LectureComponent implements OnInit {
  actions: Array<PoPageAction> = [
    { label: "Create", url: "home/lectures/create" },
  ];

  cancel: PoModalAction = {
    action: () => {
      this.lectureFilterModal.close();
    },
    label: "Cancelar",
  };

  confirm: PoModalAction = {
    action: () => {
      this.filterLecturesByTracks();
      this.lectureFilterModal.close();
    },
    label: "Confirmar",
  };

  displayAll: boolean = true;
  filter: PoPageFilter = {
    action: this.filterLecturesByTitle.bind(this),
    advancedAction: this.lectureFilterActionModal.bind(this),
    placeholder: "Title",
  };

  filteredTracksId: Array<string> = [];
  labelPosition = PoSwitchLabelPosition.Left;
  lectures: Array<Lecture>;
  lecturesCache: Array<Lecture> = [];
  tracks: Array<any>;

  @ViewChild("lectureFilterModal", { static: false })
  lectureFilterModal: PoModalComponent;

  constructor(
    private lectureService: LectureService,
    private trackService: TrackService
  ) {}

  ngOnInit() {
    this.getLectures();
    this.getTracks();
  }

  filterLecturesByTitle(label: string) {
    if (label) {
      this.lecturesCache = this.lectures.filter((lecture) =>
        lecture.title.toLowerCase().includes(label.toLocaleLowerCase())
      );
    } else {
      this.getLectures();
    }
  }

  filterLecturesByTracks() {
    if (this.filteredTracksId) {
      this.lecturesCache = this.lectures.filter((lecture) =>
        this.filteredTracksId.find((id) => id === lecture.track.id)
      );
    }
  }

  getLectures() {
    this.lectureService.get().subscribe((lectures) => {
      this.lectures = lectures.items.filter(
        (lecture) => lecture.deleted === false
      );
      this.lecturesCache = [...this.lectures];
    });
  }

  getTracks() {
    this.trackService.get().subscribe((tracks) => {
      this.tracks = tracks.items
        .filter((track) => track.deleted === false)
        .map((track) => Object.assign(track, { model: true }));
    });
  }

  lectureFilterActionModal() {
    this.lectureFilterModal.open();
  }

  selectAllTracks() {
    this.tracks.forEach((track) => {
      if (this.displayAll) {
        Object.assign(track, { model: true });
        this.pushTrackInSelectedFilter(track.id);
      } else {
        Object.assign(track, { model: false });
        this.popTrackInSelectedFilter(track.id);
      }
    });
  }

  selectTrack(trackId: string) {
    if (this.filteredTracksId.includes(trackId)) {
      this.popTrackInSelectedFilter(trackId);
    } else {
      this.pushTrackInSelectedFilter(trackId);
    }
  }

  private popTrackInSelectedFilter(trackId: string) {
    this.filteredTracksId = this.filteredTracksId.filter(
      (trkId) => trkId !== trackId
    );
  }

  private pushTrackInSelectedFilter(trackId: string) {
    this.filteredTracksId = [...this.filteredTracksId, trackId];
  }
}
